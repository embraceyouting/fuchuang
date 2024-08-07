const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const { createMessage } = require("../utils/message");

const map = {}

router.get("/cover", async (req, res) => {
	const url = req.query.url;
	if (!url) {
		return res.status(400).send(createMessage(400, "未提供网址"));
	}
	if (map[url]) {
		return res.send(createMessage(200, "获取封面成功", map[url]));
	}
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
			return res.status(400).send(createMessage(400, "获取封面失败"));
		}
		res.send(createMessage(200, "获取封面成功", cover));
		map[url] = cover;
	} catch (error) {
		res.status(500).send(createMessage(500, "获取封面失败"));
	}
});

module.exports = router;
