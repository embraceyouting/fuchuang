const express = require("express");
const router = express.Router();
const { createMessage } = require("../utils/message");
const { openai } = require("../utils/openai");

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
		// model: "gpt-3.5-turbo",
		model: "gpt-4-turbo-preview",
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

module.exports = router;
