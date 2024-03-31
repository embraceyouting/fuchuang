const express = require("express");
const router = express.Router();
const upload = require("../utils/upload.js");
const db = require("../utils/db");
const { createMessage } = require("../utils/message");
const { readFile } = require("fs");
const { generatePDF } = require("../utils/pdf.js");
const { marked } = require("marked");
const fs = require("fs");

const defaultPdf = fs.readFileSync("./assets/pdf/index.md", "utf-8");

async function getReport(json) {
	return {
		report: defaultPdf,
		score: Math.floor(Math.random() * 40 + 60),
	};
}

router.post("/", function (req, res) {
	upload(req, res, async function (err) {
		if (err) {
			return res.status(500).send(createMessage(500, "上传文件时出错。"));
		}
		const uid = req.user.id;
		for (let i = 0; i < req.files.length; i++) {
			const file = req.files[i];
			const jsonPath = "uploads/" + file.filename; // 构建文件路径，相对于 public 目录
			const filename = Buffer.from(file.originalname, "latin1").toString(
				"utf-8"
			);
			const sql =
				"INSERT INTO files (uid, path, filename) VALUES (?, ?, ?)";
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
						resolve(result.insertId);
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
				const sql = "UPDATE files SET website = ? WHERE id = ?";
				db.query(sql, [website, file.id], (err, result) => {});

				getReport(json)
					.then(({score, report}) => {
						const sql =
							"UPDATE files SET score = ? WHERE id = ?";
						db.query(sql, [score, file.id], (err, result) => {});
						return generatePDF(marked(report))
					})
					.then((path) => {
						const sql =
							"UPDATE files SET path_pdf = ? WHERE id = ?";
						db.query(sql, [path, file.id], (err, result) => {});
					});
			});
		}
		res.status(200).send(createMessage(200, "文件上传成功。", req.files));
	});
});

router.get("/:id?", (req, res) => {
	const { id } = req.params;
	const sql = id
		? "SELECT filename as title,path,id,time,website as url,path_pdf,score FROM files WHERE id = ?"
		: "SELECT f.filename as title,f.path,f.id,f.time,f.website as url,f.path_pdf,f.score,u.username,u.id as uid FROM files as f JOIN users as u ON f.uid = u.id WHERE f.uid = ? ORDER BY f.id DESC";
	db.query(sql, [id || req.user.id], (err, results) => {
		if (err) {
			return res.status(500).send(createMessage(500, "获取数据时出错"));
		}
		res.send(createMessage(200, "获取数据成功", id ? results[0] : results));
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
