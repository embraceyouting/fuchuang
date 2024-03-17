const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const { createMessage } = require("./util");

const openai = new OpenAI({
	apiKey: process.env.GPT_API_KEY,
	baseURL: "https://api.chatanywhere.com.cn/v1",
});

router.get("/", async (req, res) => {
	const query = req.query.key;
	if (!query?.trim()) {
		return res.status(400).send(createMessage(400, "未提供查询内容"));
	}

	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Connection", "keep-alive");
	res.setHeader("Cache-Control", "no-cache");
	res.flushHeaders();

	const stream = await openai.beta.chat.completions.stream({
		messages: [{ role: "user", content: query }],
		model: "gpt-3.5-turbo",
		stream: true,
	});

	stream.on("content", (delta, snapshot) => {
		res.write(`data: ${delta}\n\n`);
	});

	for await (const chunk of stream) {
		process.stdout.write(chunk.choices[0]?.delta?.content || "");
	}

	await stream.finalChatCompletion();
	process.stdout.write("\n");
	
	res.end();
});

module.exports = router;
