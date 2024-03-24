const express = require("express");
const router = express.Router();
const upload = require("../utils/upload.js");
const db = require("../utils/db");
const { createMessage } = require("../utils/message");
const { readFileSync } = require("fs");

router.post("/", function (req, res) {
	upload(req, res, function (err) {
		if (err) {
			return res.status(500).send(createMessage(500, "上传文件时出错。"));
		}
		const uid = req.user.id;
		req.files.forEach((file) => {
			const jsonPath = "uploads/" + file.filename; // 构建文件路径，相对于 public 目录
			const filename = Buffer.from(file.originalname, "latin1").toString(
				"utf-8"
			);
			const website = Object.entries(
				JSON.parse(readFileSync(file.path, "utf-8"))
					.data.map((item) => item.pageAttr.url.value)
					.reduce((p, c) => ((p[c] = p[c] ? p[c] + 1 : 1), p), {})
			)
				.sort(([k1, v1], [k2, v2]) => v1 - v2)
				.pop()[0];
			const sql =
				"INSERT INTO files (uid, path, filename, website) VALUES (?, ?, ?, ?)";
			db.query(
				sql,
				[uid, jsonPath, filename, website],
				function (err, result) {
					if (err) {
						return res
							.status(500)
							.send(createMessage(500, "插入数据库时出错。"));
					}
					file.id = result.insertId;
				}
			);
		});
		res.status(200).send(createMessage(200, "文件上传成功。", req.files));
	});
});

router.get("/", (req, res) => {
	const sql =
		"SELECT f.filename as title,f.path,f.id,f.time,f.website as url,u.username,u.id as uid FROM files as f JOIN users as u ON f.uid = u.id WHERE f.uid = ? ORDER BY f.id DESC";
	db.query(sql, [req.user.id], (err, results) => {
		if (err) {
			return res.status(500).send(createMessage(500, "获取路径时出错。"));
		}
		res.send(createMessage(200, "获取路径成功。", results));
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
