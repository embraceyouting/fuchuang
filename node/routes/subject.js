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
			const filename = Buffer.from(file.originalname, "latin1").toString("utf-8");
			const website = JSON.parse(readFileSync(file.path, "utf-8")).desc;
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
	const sql = "SELECT f.filename as title,f.path,f.id,f.time,f.website as url,u.username,u.id as uid FROM files as f JOIN users as u ON f.uid = u.id";
	db.query(sql, (err, results) => {
		if (err) {
			return res.status(500).send(createMessage(500, "获取路径时出错。"));
		}
		res.send(createMessage(200, "获取路径成功。", results));
	});
});

router.delete("/", (req, res) => {
	// 从请求的查询参数中获取文件名
	const { filename } = req.query;
	console.log(filename);
	// 检查filename是否提供
	if (!filename) {
		return res.status(400).send(createMessage(400, "未提供文件名。"));
	}
	// 构建用于删除记录的SQL查询
	const sql = "DELETE FROM files WHERE filename = ?";
	// 执行查询，使用文件名作为参数
	db.query(sql, [filename], (err, result) => {
		if (err) {
			console.error("删除数据库记录时出错:", err);
			return res
				.status(500)
				.send(createMessage(500, "删除数据库记录时出错。"));
		}
		// 判断是否成功删除数据
		if (result.affectedRows === 0) {
			return res.status(404).send(createMessage(404, "文件不存在。"));
		} else {
			res.send(createMessage(200, "文件删除成功。"));
		}
	});
});

module.exports = router;
