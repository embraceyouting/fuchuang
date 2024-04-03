const express = require("express");
const router = express.Router();
const upload = require("../utils/upload.js");
const db = require("../utils/db");
const { createMessage } = require("../utils/message");
const { readFile } = require("fs");
const { generatePDF } = require("../utils/pdf.js");
const { marked } = require("marked");
const { openai } = require("../utils/openai");

async function getReport(json) {
	// request 后端 然后把problems转成真实的就可以了
	const problems = {
		click_no_response: [],
		high_bounce_rate: { count: 10 },
		repeat_click: [],
		slow_page_toad: { count: 7 },
		slow_network_feedback: [],
		click_error: { count: 3 },
		page_load_error: [],
		white_screen: { count: 5 },
	}
	const chatCompletion = await openai.chat.completions.create({
		messages: [
			{ role: "assistant", content: "你是一个网站体验评测的助手，你的任务是帮助我评测网站体验，返回分数和报告。" },
			{ role: "user", content: "我会给你传入一个对象，包含八个字段，每个字段代表用户在使用网站时遇到的问题，请你分析该用户在使用网站时遇到的问题，然后生成一个网站体验分数（百分制）和一份使用markdown语法编写的网站体验报告。你可以给网站评分分为若干个指标，例如：页面加载速度、点击响应速度、页面稳定性、用户交互体验等等，并给这些指标分别打分，你返回的分数需要为这些指标单独分数的平均值。你需要以下面的格式进行返回：{分数}\n{报告}，请不要说多余的内容，直接返回我需要的内容即可。" },
			{ role: "user", content: JSON.stringify(problems) },
		],
		// model: "gpt-4-turbo-preview",
		model: "gpt-3.5-turbo",
	});
	const gptContent = chatCompletion.choices[0].message.content
	console.log(gptContent)
	const score = gptContent.split("\n").shift().trim();
	const report = gptContent.split("\n").slice(1).join("\n");
	return {
		report,
		score,
		raw: JSON.stringify(problems)
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
				db.query(sql, [website, file.id], (err, result) => {});

				getReport(json)
					.then(({ score, report, raw }) => {
						const sql = "UPDATE files SET score = ? WHERE id = ?";
						db.query(sql, [score, file.id], (err, result) => {});
						return generatePDF(marked(report), raw);
					})
					.then((path) => {
						const sql =
							"UPDATE files SET path_pdf = ? WHERE id = ?";
						db.query(sql, [path, file.id], (err, result) => {});
					});
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
