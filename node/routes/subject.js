const express = require("express");
const router = express.Router();
const upload = require("../utils/upload.js");
const db = require("../utils/db");
const { createMessage } = require("../utils/message");
const { readFile } = require("fs");
const { generatePDF } = require("../utils/pdf.js");
const { marked } = require("marked");
const { openai } = require("../utils/openai");
const http = require('http');

async function getReport(json, problems) {
	function extractEventData(problems) {
		console.log(problems)
		const eventData = JSON.parse(problems)["综合体验"]["鼠标事件"];
		const {
			'重复点击次数': repeat_click,
			'点击后延迟大于1000ms次数：': slow_page_toad,
			'点击报错次数': click_error,
			'加载错误次数': page_load_error,
			'出现白屏次数': white_screen,
			'多个问题同时出现的事件数': multipleIssuesCount,
		} = eventData;

		return {
			repeat_click,
			slow_page_toad,
			click_error,
			page_load_error,
			white_screen,
			multipleIssuesCount,
		};
	}

	const chatCompletion = await openai.chat.completions.create({
		messages: [
			{ role: "assistant", content: "你是一个网站体验评测的助手，你的任务是帮助我评测网站体验，返回分数和报告。" },
			{ role: "user", content: "我会给你传入一个json对象，包含几个字段，代表用户在使用网站时遇到的问题，请你分析该用户在使用网站时遇到的问题，然后生成一个网站体验分数（百分制）和一份使用markdown语法编写的网站体验报告，并生成最终的得分和解决方案,每个问题方面分成三个部分，每个问题的标题部分、评分部分、和分析部分，格式为标题，然后换行是评分，再换行是分析，评分和分析前面都有一个markdown语法的-,标题只是加粗,你需要保证这部分的格式。你可以给网站评分分为若干个指标，例如：页面加载速度、点击响应速度、页面稳定性、用户交互体验等等，并给这些指标分别打分，你返回的最终分数为这些指标单独分数的平均值。你需要以下面的格式进行返回：{分数}\n{报告}，请不要说多余的内容，直接返回我需要的内容即可。" },
			{ role: "user", content: JSON.stringify(problems) },
		],
		model: "gpt-4-turbo-preview",
		// model: "gpt-3.5-turbo",
	});
	const gptContent = chatCompletion.choices[0].message.content
	console.log(gptContent)
	const score = gptContent.split("\n").shift().trim();
	const report = gptContent.split("\n").slice(1).join("\n");
	return {
		report,
		score,
		raw: JSON.stringify(extractEventData(problems))
	};
}

router.post("/", function (req, res) {
	upload(req, res, async function (err) {
		if (err) {
			return res.status(500).send(createMessage(500, "上传文件时出错。"));
		}
		const uid = req.user.id;
		for (let i = 0; i < req.files.length; i++) {
			const file = req.files[i];
			const jsonPath = "uploads/" + file.filename; // 构建文件路径，相对于 public 目录
			const filename = Buffer.from(file.originalname, "latin1").toString(
				"utf-8"
			);
			const sql =
				"INSERT INTO files (uid, path, filename) VALUES (?, ?, ?)";
			const id = await new Promise((resolve) => {
				db.query(
					sql,
					[uid, jsonPath, filename],
					function (err, result) {
						if (err) {
							return res
								.status(500)
								.send(createMessage(500, "插入数据库时出错。"));
						}
						resolve(result.insertId);
					}
				);
			});
			file.id = id;

			readFile(file.path, "utf-8", (err, data) => {
				if (err) {
					return res
						.status(500)
						.send(createMessage(500, "读取文件时出错。"));
				}
				const json = JSON.parse(data);
				const website = Object.entries(
					json.data
						.map((item) => item.pageAttr.url.value)
						.reduce((p, c) => ((p[c] = p[c] ? p[c] + 1 : 1), p), {})
				)
					.sort(([k1, v1], [k2, v2]) => v1 - v2)
					.pop()[0];
				const sql = "UPDATE files SET website = ? WHERE id = ?";
				db.query(sql, [website, file.id], (err, result) => { });


				const http = require('http');
				const datajson = JSON.stringify(json);
				const options = {
					hostname: '192.168.1.103',
					port: 5000,
					path: '/endpoint',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Content-Length': Buffer.byteLength(datajson) // 计算数据长度
					}
				};
				const req = http.request(options, (res) => {
					console.log(`statusCode: ${res.statusCode}`);
					res.on('data', (chunk) => {
						const problems = chunk.toString()
						if (res.statusCode === 200) {
							getReport(json, problems)
								.then(({ score, report, raw }) => {
									const sql = "UPDATE files SET score = ? WHERE id = ?";
									db.query(sql, [score, file.id], (err, result) => { });
									return generatePDF(marked(report), raw);
								})
								.then((path) => {
									const sql =
										"UPDATE files SET path_pdf = ? WHERE id = ?";
									db.query(sql, [path, file.id], (err, result) => { });
								});
						}
						else {
							console.log("something is wrong")
						}
					});
				});
				req.on('error', (error) => {
					console.error('Error:', error);
				});
				req.write(datajson);
				req.end();
			});
		}
		res.status(200).send(createMessage(200, "文件上传成功。", req.files));
	});
});

router.get("/:id?", (req, res) => {
	const { id } = req.params;
	const sql = id
		? "SELECT filename as title,path,id,time,website as url,path_pdf,score FROM files WHERE id = ?"
		: "SELECT f.filename as title,f.path,f.id,f.time,f.website as url,f.path_pdf,f.score,u.username,u.id as uid FROM files as f JOIN users as u ON f.uid = u.id WHERE f.uid = ? ORDER BY f.id DESC";
	db.query(sql, [id || req.user.id], (err, results) => {
		if (err) {
			return res.status(500).send(createMessage(500, "获取数据时出错"));
		}
		res.send(createMessage(200, "获取数据成功", id ? results[0] : results));
	});
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).send(createMessage(400, "未提供文件名。"));
	}
	const sql = "DELETE FROM files WHERE id = ?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.error("删除数据库记录时出错:", err);
			return res
				.status(500)
				.send(createMessage(500, "删除数据库记录时出错。"));
		}
		if (result.affectedRows === 0) {
			return res.status(404).send(createMessage(404, "文件不存在。"));
		} else {
			res.send(createMessage(200, "项目删除成功"));
		}
	});
});

module.exports = router;
