const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const { createMessage } = require("../utils/message");

router.get("/", async (req, res) => {
	const url = req.query.url;
	try {
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);
		const cover =
			$("meta[property='og:image']").attr("content") ||
			$("meta[name='twitter:image']").attr("content") ||
			$("meta[name='image']").attr("content") ||
			$("link[rel='image_src']").attr("href");
		if (!cover) {
			return res.status(400).send(createMessage(400, "未获取到封面"));
		}
		res.send(createMessage(200, "获取封面成功", cover));
	} catch (error) {
		res.status(500).send(createMessage(500, "获取封面失败"));
	}
});

module.exports = router;
