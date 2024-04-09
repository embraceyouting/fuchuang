const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const { createMessage } = require("../utils/message");

router.get("/cover", async (req, res) => {
	const url = req.query.url;
	try {
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);
		const cover =
			$("meta[property='og:image']").attr("content") ||
			$("meta[name='twitter:image']").attr("content") ||
			$("meta[name='image']").attr("content") ||
			$("meta[itemprop='image']").attr("content") ||
			$("meta[name='og:image']").attr("content") ||
			$("meta[itemprop='thumbnailUrl']").attr("content") ||
			$("link[rel='image_src']").attr("href") ||
			$("img").attr("src") ||
			$("link[rel='icon']").attr("href") ||
			$("link[rel='apple-touch-icon']").attr("href") ||
			$("link[rel='shortcut icon']").attr("href");
		if (!cover) {
			return res.status(400).send(createMessage(400));
		}
		res.send(createMessage(200, "获取封面成功", cover));
	} catch (error) {
		res.status(500).send(createMessage(500, "获取封面失败"));
	}
});

router.get("/", (req, res) => {
	res.send(createMessage(200, "Hello World!"));
});

module.exports = router;
