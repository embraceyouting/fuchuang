const express = require("express");
const router = express.Router();
const { createMessage } = require("../utils/message");
const { openai } = require("../utils/openai");

router.use((req, res, next) => {
	const query = req.query.key;
	if (!query?.trim()) {
		return res.status(400).send(createMessage(400, "未提供查询内容"));
	}
	next();
})

router.get("/stream", async (req, res) => {
	const query = req.query.key;
	const user = req.user;

	if (checkLimit(user.id)) {
		return res.status(429).send(createMessage(429, "请求过于频繁"));
	}

	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Connection", "keep-alive");
	res.setHeader("Cache-Control", "no-cache");
	res.flushHeaders();

	const stream = await openai.beta.chat.completions.stream({
		messages: [{ role: "system", content: "你是一个网页体验智能助手，你叫FlyView小助手，你可以分析网页的体验情况，帮助开发者解决网页体验问题，你可以帮助用户直接分析json数据，也可以分析生成的pdf报告，详细说明报告中的内容。当用户输入[help]查看帮助，请回复你的功能。" }, { role: "user", content: query }],
		model: "gpt-3.5-turbo-0125",
		// model: "gpt-4-turbo-preview",
		stream: true,
	});

	stream.on("content", (delta, snapshot) => {
		res.write(`data: ${JSON.stringify({ msg: delta })}\n\n`);
	});

	stream.on("end", () => {
		res.write(`data: ${JSON.stringify({ msg: "[DONE]" })}\n\n`);
	});

	for await (const chunk of stream) {
		process.stdout.write(chunk.choices[0]?.delta?.content || "");
	}

	process.stdout.write("\n");
});

function getCheckLimit() {
	const limitMap = {};

	setInterval(() => {
		for (const id in limitMap) {
			if (Date.now() - limitMap[id].time > 24 * 60 * 60 * 1000) {
				delete limitMap[id];
			}
		}
	}, 24 * 60 * 60 * 1000);

	return function (id) {
		const time = Date.now();
		if (!limitMap[id]) {
			limitMap[id] = {
				time,
				total_count: 1
			};
		} else {
			if (time - limitMap[id].time < 10000) {
				return true
			} else {
				limitMap[id].time = time;
				limitMap[id].total_count++;
				if (limitMap[id].total_count > 10) {
					return true
				}
			}
		}
		return false
	}
}

const checkLimit = getCheckLimit();

router.get("/", async (req, res) => {
	const user = req.user;

	if (checkLimit(user.id)) {
		return res.status(429).send(createMessage(429, "请求过于频繁"));
	}

	const query = req.query.key;
	const result = await openai.chat.completions.create({
		messages: [{ role: "system", content: "你是一个网页体验智能助手，你叫FlyView小助手，你可以分析网页的体验情况，帮助开发者解决网页体验问题，你可以帮助用户直接分析json数据，也可以分析生成的pdf报告，详细说明报告中的内容。当用户输入[help]查看帮助，请回复你的功能。" }, { role: "user", content: query }],
		model: "gpt-3.5-turbo-0125",
		// model: "gpt-4-turbo-preview",
	});
	res.send(createMessage(200, "查询成功", result.choices[0].message.content));
});

module.exports = router;
