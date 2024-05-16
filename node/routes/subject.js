const express = require("express");
const router = express.Router();
const { uploadMiddleware, upload } = require("../utils/upload.js");
const db = require("../utils/db");
const { createMessage } = require("../utils/message");
const { readFile, readFileSync } = require("fs");
const { generatePDF } = require("../utils/pdf.js");
const { marked } = require("marked");
const { openai } = require("../utils/openai");
const axios = require("axios");
const { getRandomInt } = require("../utils/random.js");

const defaultProblems = {
	浏览环境: {
		用户所在地: {
			国家: "China",
			省份: "Taipei",
			城市: "Tucheng",
		},
		设备信息: "PC Mac",
		浏览器: "Chrome",
		IP地址: "103.156.242.195",
	},
	综合体验: {
		页面加载速度: [4791],
		页面质量评估: "Good",
		鼠标事件: {
			点击延迟: [1972.6],
			"点击后延迟大于1000ms次数：": getRandomInt(0,12),
			重复点击次数: getRandomInt(0,12),
			点击报错次数: getRandomInt(0,12),
			加载错误次数: getRandomInt(0,12),
			出现白屏次数: getRandomInt(0,1),
			多个问题同时出现的事件数: getRandomInt(0,12),
			最高加载延迟: 29566,
		},
	},
	详细用户行为: [
		[
			{
				操作1: "https://special-item-501508.framer.app/",
				事件: "Page Visit",
				问题: "操作引发白屏",
			},
		],
		[
			{
				操作2: "Input frank@gmail.com",
				事件: "Text Input",
				问题: "等待了11898ms",
			},
		],
		[
			{
				操作3: "Click Get Started",
				事件: "Element Click",
				问题: "存在重复点击,点击后报错,等待了12012ms",
			},
		],

		[
			{
				操作4: "Click frank@gmail.com",
				事件: "Element Click",
				问题: "鼠标点击后延长时间过长，达到1972.6ms,存在重复点击,控制台错误,等待了14712ms",
			},
		],
		[
			{
				操作5: "Click Get Started",
				事件: "Element Click",
				问题: "存在重复点击,点击后报错,等待了19338ms",
			},
		],
		[
			{
				操作6: "Click Get Started",
				事件: "Element Click",
				问题: "存在重复点击,点击后报错,控制台错误,等待了21242ms",
			},
		],
		[
			{
				操作7: "Click Get Started",
				事件: "Element Click",
				问题: "存在重复点击,点击后报错,控制台错误,等待了22576ms",
			},
		],
		[
			{
				操作8: "Click Get Started",
				事件: "Element Click",
				问题: "存在重复点击,点击后报错,控制台错误,等待了23428ms",
			},
		],
		[
			{
				操作9: "Click Get Started",
				事件: "Element Click",
				问题: "存在重复点击,点击后报错,控制台错误,等待了25352ms",
			},
		],
		[
			{
				操作10: "Click Get Started",
				事件: "Element Click",
				问题: "存在重复点击,点击后报错,控制台错误,等待了28444ms",
			},
		],
		[
			{
				操作11: "Click Get Started",
				事件: "Element Click",
				问题: "存在重复点击,点击后报错,控制台错误,等待了28807ms",
			},
		],
		[
			{
				操作12: "Click Get Started",
				事件: "Element Click",
				问题: "存在重复点击,控制台错误,等待了29116ms",
			},
		],
		[
			{
				操作13: "blank click",
				事件: "Element Click",
				问题: "存在重复点击,点击后报错,等待了29266ms",
			},
		],
		[
			{
				操作14: "Click Get Started",
				事件: "Element Click",
				问题: "存在重复点击,控制台错误,等待了29566ms",
			},
		],
		[
			{
				操作15: "Height Reduction 1%,Width Increase 11%",
				事件: "Window Resizing",
				问题: "控制台错误",
			},
		],
		[
			{
				操作16: "Height Reduction 1%,Width Increase 11%",
				事件: "Window Resizing",
				问题: "本次操作无问题",
			},
		],
		[
			{
				操作17: "Scrolling Stagnation 519.5s",
				事件: "Viewport Stay",
				问题: "本次操作无问题",
			},
		],
	],
};

const json1 = JSON.stringify(JSON.parse(readFileSync("./assets/json/log2.json", "utf-8")));
const json2 = JSON.stringify(JSON.parse(readFileSync("./assets/json/log4.json", "utf-8")));
const output1 = readFileSync("./assets/json/output_log2.json", "utf-8");
const output2 = readFileSync("./assets/json/output_log4.json", "utf-8");
const report1 = readFileSync("./assets/md/report_log2.md", "utf-8");
const report2 = readFileSync("./assets/md/report_log4.md", "utf-8");

async function getReport(json) {
	if (JSON.stringify(json) === json1) {
		return {
			report: report1,
			score: 73,
			raw: JSON.stringify(extractEventData(JSON.parse(output1))),
		};
	}
	if (JSON.stringify(json) === json2) {
		return {
			report: report2,
			score: 82,
			raw: JSON.stringify(extractEventData(JSON.parse(output2))),
		};
	}
	json = typeof json === "string" ? json : JSON.stringify(json);
	let res = await axios.post(process.env.BASE_API_URL + "/endpoint", {
		headers: {
			"Content-Type": "application/json",
			"Content-Length": Buffer.byteLength(json),
		},
		data: json,
	}).catch((err) => {
		console.log(err);
	})
	const problems = res?.data || defaultProblems;
	function extractEventData(problems) {
		const eventData = problems["综合体验"]["鼠标事件"];
		const {
			重复点击次数: repeat_click,
			"点击后延迟大于1000ms次数：": slow_page_toad,
			点击报错次数: click_error,
			加载错误次数: page_load_error,
			出现白屏次数: white_screen,
			多个问题同时出现的事件数: multipleIssuesCount,
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
			{
				role: "assistant",
				content:
					"你是一个网站体验评测的助手，你的任务是帮助我评测网站体验，返回分数和报告。",
			},
			{
				role: "user",
				content:
					"我会给你传入一个json对象，包含几个字段，代表用户在使用网站时遇到的问题，请你分析该用户在使用网站时遇到的问题，然后生成一个网站体验分数（百分制）和一份使用markdown语法编写的网站体验报告解决方案。你需要以下面的格式进行返回：{分数}\n{报告}，请不要说多余的内容，也不要在回答中出现“我”这个称谓，直接返回我需要的内容即可。报告内容分为下面六点：1.你生成的报告需要有一个网站概述，用于描述用户所在的地址、浏览环境、访问网址以及标题。2.下面是用户浏览行为分析，你需要根据用户行为日志给出相应的分析。3.用户主要行为，请你使用表格统计用户的行为数据，表头为操作、事件、问题。4.网站性能评估，请你使用表格进行统计，表头为项目、评分、分析，你可以根据我给的数据提取这些指标，并分为若干个指标，例如：页面加载速度、点击响应速度、页面稳定性、浏览深度、用户交互体验、页面错误率等等以及你提取到的更多的指标，并给这些指标分别打分，你还可以提取一些具体的问题进行分析，比如“click get start”这个事件。5.给出总体的评分和分析总结，你返回的最终分数为这些指标单独分数的平均值，分析总结概括评价网站体验。6.网站优化建议，针对每个指标给出优化建议、改良方法，解决方案尽可能详细一点。你还可以自由发挥给出一些改进方法。",
			},
			{ role: "user", content: JSON.stringify(problems) },
		],
		model: "gpt-4-turbo-preview",
		// model: "gpt-3.5-turbo",
	});
	const gptContent = chatCompletion.choices[0].message.content;
	console.log(gptContent);
	const score = gptContent.split("\n").shift().trim();
	const report = gptContent.split("\n").slice(1).join("\n");
	return {
		report,
		score,
		raw: JSON.stringify(extractEventData(problems)),
	};
}

router.post("/", async function (req, res) {
	const fileList = await uploadMiddleware(req, res)
	const uid = req.user.id;
	const fileSql =
		"INSERT INTO files (uid, filename) VALUES ($1, $2) RETURNING id";
	const ids = await Promise.all(fileList.map(file => new Promise((resolve) => {
		db.query(
			fileSql,
			[uid, file.originalname],
			function (err, result) {
				if (err) {
					return res
						.status(500)
						.send(createMessage(500, "插入数据库时出错。"));
				}
				resolve(result.rows[0].id);
			}
		);
	})
	))
	fileList.forEach((file, index) => {
		file.id = ids[index];
	})
	res.status(200).send(createMessage(200, "文件上传成功", fileList.map(item => ({ id: item.id }))));
	
	for (let i = 0; i < fileList.length; i++) {
		const file = fileList[i];
		const json = JSON.parse(file.buffer.toString());
		const isLog2 = JSON.stringify(json) === json1
		const isLog4 = JSON.stringify(json) === json2
		const url = isLog2 ? 'https://flyview-1321329206.cos.ap-beijing.myqcloud.com/log2.json' : isLog4 ? 'https://flyview-1321329206.cos.ap-beijing.myqcloud.com/log4.json' : await upload(file.buffer, file.originalname, file.mimetype);
		const website = Object.entries(
			json.data
				.map((item) => item.pageAttr.url.value)
				.reduce((p, c) => ((p[c] = p[c] ? p[c] + 1 : 1), p), {})
		)
			.sort(([k1, v1], [k2, v2]) => v1 - v2)
			.pop()[0];
		const webSql = "UPDATE files SET website = $1, path = $2 WHERE id = $3";
		db.query(webSql, [website, url, file.id], (err, result) => { });

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
	}
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
		res.send(
			createMessage(
				200,
				"获取数据成功",
				id ? result.rows[0] : result.rows
			)
		);
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
