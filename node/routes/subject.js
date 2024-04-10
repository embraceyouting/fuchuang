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

async function getReport(json) {
	const problems1 = {
		"浏览环境": {
			"用户所在地": {
				"国家": "China",
				"省份": "Taipei",
				"城市": "Tucheng"
			},
			"设备信息": "PC Mac",
			"浏览器": "Chrome",
			"IP地址": "103.156.242.195"
		},
		"综合体验": {
			"页面加载速度": [
				4791
			],
			"页面质量评估": "Good",
			"鼠标事件": {
				"点击延迟": [
					1972.6
				],
				"点击后延迟大于1000ms次数：": 1,
				"重复点击次数": 12,
				"点击报错次数": 9,
				"加载错误次数": 10,
				"出现白屏次数": 1,
				"多个问题同时出现的事件数": 12,
				"最高加载延迟": 29566
			}
		},
		"详细用户行为": [
			[
				{
					"操作1": "https://special-item-501508.framer.app/",
					"事件": "Page Visit",
					"问题": "操作引发白屏"
				}
			],
			[
				{
					"操作2": "Input frank@gmail.com",
					"事件": "Text Input",
					"问题": "等待了11898ms"
				}
			],
			[
				{
					"操作3": "Click Get Started",
					"事件": "Element Click",
					"问题": "存在重复点击,点击后报错,等待了12012ms"
				}
			],
	
	 [
				{
					"操作4": "Click frank@gmail.com",
					"事件": "Element Click",
					"问题": "鼠标点击后延长时间过长，达到1972.6ms,存在重复点击,控制台错误,等待了14712ms"
				}
			],
			[
				{
					"操作5": "Click Get Started",
					"事件": "Element Click",
					"问题": "存在重复点击,点击后报错,等待了19338ms"
				}
			],
			[
				{
					"操作6": "Click Get Started",
					"事件": "Element Click",
					"问题": "存在重复点击,点击后报错,控制台错误,等待了21242ms"
				}
			],
			[
				{
					"操作7": "Click Get Started",
					"事件": "Element Click",
					"问题": "存在重复点击,点击后报错,控制台错误,等待了22576ms"
				}
			],
			[
				{
					"操作8": "Click Get Started",
					"事件": "Element Click",
					"问题": "存在重复点击,点击后报错,控制台错误,等待了23428ms"
				}
			],
			[
				{
					"操作9": "Click Get Started",
					"事件": "Element Click",
					"问题": "存在重复点击,点击后报错,控制台错误,等待了25352ms"
				}
			],
			[
				{
					"操作10": "Click Get Started",
					"事件": "Element Click",
					"问题": "存在重复点击,点击后报错,控制台错误,等待了28444ms"
				}
			],
			[
				{
					"操作11": "Click Get Started",
					"事件": "Element Click",
					"问题": "存在重复点击,点击后报错,控制台错误,等待了28807ms"
				}
			],
			[
				{
					"操作12": "Click Get Started",
					"事件": "Element Click",
					"问题": "存在重复点击,控制台错误,等待了29116ms"
				}
			],
			[
				{
					"操作13": "blank click",
					"事件": "Element Click",
					"问题": "存在重复点击,点击后报错,等待了29266ms"
				}
			],
			[
				{
					"操作14": "Click Get Started",
					"事件": "Element Click",
					"问题": "存在重复点击,控制台错误,等待了29566ms"
				}
			],
			[
				{
					"操作15": "Height Reduction 1%,Width Increase 11%",
					"事件": "Window Resizing",
					"问题": "控制台错误"
				}
			],
			[
				{
					"操作16": "Height Reduction 1%,Width Increase 11%",
					"事件": "Window Resizing",
					"问题": "本次操作无问题"
				}
			],
			[
				{
					"操作17": "Scrolling Stagnation 519.5s",
					"事件": "Viewport Stay",
					"问题": "本次操作无问题"
				}
			]
		]
	}
	function extractEventData(problems) {
		const eventData = problems["综合体验"]["鼠标事件"];
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
			{ role: "user", content: "我会给你传入一个json对象，包含几个字段，代表用户在使用网站时遇到的问题，请你分析该用户在使用网站时遇到的问题，然后生成一个网站体验分数（百分制）和一份使用markdown语法编写的网站体验报告，并生成最终的得分和解决方案,每个问题方面分成三个部分，每个问题的标题部分、评分部分、和分析部分，格式为标题，然后换行是评分，再换行是分析，评分和分析前面都有一个markdown语法的-,你需要保证这部分的格式。你可以根据我给的数据提取这些指标，并分为若干个指标，例如：页面加载速度、点击响应速度、页面稳定性、浏览深度、用户交互体验、页面错误率等等以及你提取到的更多的指标,并给这些指标分别打分，你还可以提取一些具体的问题进行分析，比如“click get start”这个事件，你返回的最终分数为这些指标单独分数的平均值，你最后还需要返回一个总体的评分和分析，以及最后针对每个指标的解决方案尽可能详细一点。你需要以下面的格式进行返回：{分数}\n{报告}，请不要说多余的内容，也不要在回答中出现“我”这个称谓，直接返回我需要的内容即可。" },
			{ role: "user", content: JSON.stringify(problems1) },
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
		raw: JSON.stringify(extractEventData(problems1))
	};
}

router.post("/", function (req, res) {
	upload(req, res, async function (err) {
		if (err) {
			return res.status(500).send(createMessage(500, "上传文件时出错"));
		}
		const uid = req.user.id;
		for (let i = 0; i < req.files.length; i++) {
			const file = req.files[i];
			const jsonPath = "uploads/" + file.filename; // 构建文件路径，相对于 public 目录
			const filename = Buffer.from(file.originalname, "latin1").toString(
				"utf-8"
			);
			const sql =
				"INSERT INTO files (uid, path, filename) VALUES ($1, $2, $3) RETURNING id";
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
						resolve(result.rows[0].id);
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
				const sql = "UPDATE files SET website = $1 WHERE id = $2";
				db.query(sql, [website, file.id], (err, result) => { });


				const http = require('http');
				const datajson = JSON.stringify(json);
				const options = {
					hostname: '192.168.1.111',
					port: 5000,
					path: '/endpoint',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Content-Length': Buffer.byteLength(datajson) // 计算数据长度
					}
				};
				// const req = http.request(options, (res) => {
				// 	console.log(`statusCode: ${res.statusCode}`);
				// 	res.on('data', (chunk) => {
				// 		let problemsstr = chunk.toString()
				// 		problems = problemsstr.replace(/\n/g, "");
				// 		console.log(problems)
				// 		if (res.statusCode === 200) {
							getReport(json)
								.then(({ score, report, raw }) => {
									const sql = "UPDATE files SET score = $1 WHERE id = $2";
									db.query(sql, [score, file.id], (err, result) => { });
									return generatePDF(marked(report), raw);
								})
								.then((path) => {
									const sql =
										"UPDATE files SET path_pdf = $1 WHERE id = $2";
									db.query(sql, [path, file.id], (err, result) => { });
								});
					// 	}
					// 	else {
					// 		console.log("something is wrong")
					// 	}
					// });
				// });
				// req.on('error', (error) => {
				// 	console.error('Error:', error);
				// 	getReport(json)
				// 				.then(({ score, report, raw }) => {
				// 					const sql = "UPDATE files SET score = $1 WHERE id = $2";
				// 					db.query(sql, [score, file.id], (err, result) => { });
				// 					return generatePDF(marked(report), raw);
				// 				})
				// 				.then((path) => {
				// 					const sql =
				// 						"UPDATE files SET path_pdf = $1 WHERE id = $2";
				// 					db.query(sql, [path, file.id], (err, result) => { });
				// 				});
				// });
				// req.write(datajson);
				// req.end();
			});
		}
		res.status(200).send(createMessage(200, "文件上传成功。", req.files));
	});
});

router.get("/:id?", (req, res) => {
	const { id } = req.params;
	const sql = id
		? "SELECT filename as title,path,id,time,website as url,path_pdf,score FROM files WHERE id = $1"
		: "SELECT f.filename as title,f.path,f.id,f.time,f.website as url,f.path_pdf,f.score,u.username,u.id as uid FROM files as f JOIN users as u ON f.uid = u.id WHERE f.uid = $1 ORDER BY f.id DESC";
	db.query(sql, [id || req.user.id], (err, result) => {
		if (err) {
			return res.status(500).send(createMessage(500, "获取数据时出错"));
		}
		res.send(createMessage(200, "获取数据成功", id ? result.rows[0] : result.rows));
	});
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).send(createMessage(400, "未提供文件名。"));
	}
	const sql = "DELETE FROM files WHERE id = $1";
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
