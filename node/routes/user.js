const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const JWT = require("../utils/JWT");
const { createMessage } = require("../utils/message");

router.post("/login", (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	const sql = `SELECT * FROM users WHERE email = ? and password = ?`;
	db.query(sql, [email, password], (err, result) => {
		if (err) {
			return res.status(500).send(createMessage(500, "服务器错误"));
		}
		if (result.length == 0) {
			return res.status(400).send(createMessage(400, "用户名或密码错误"));
		}
		const userInfo = result[0];
		const token = JWT.generate({ ...userInfo });
		res.setHeader("Authorization", token);
		res.send(createMessage(200, "登录成功", userInfo));
	});
});

router.post("/", (req, res) => {
	const registerInfo = req.body;
	const sql =
		"INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)";
	db.query(
		sql,
		[
			registerInfo.username,
			registerInfo.email,
			registerInfo.password,
			"images/default.png",
		],
		(err, result) => {
			if (err) {
				console.error("插入数据库时出错:", err);
				return res.status(500).send("插入数据库时出错。");
			}
			const userInfo = {
				id: result.insertId,
				username: registerInfo.username,
				email: registerInfo.email,
				avatar: "images/default.png",
			};
			const token = JWT.generate({ ...userInfo });
			res.setHeader("Authorization", token);
			res.send(createMessage(200, "注册成功", userInfo));
		}
	);
});

router.get("/", (req, res) => {
	const id = req.query.id || req.user?.id;
	const sql = `SELECT * FROM users WHERE id = ?`;
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.error("从数据库中获取数据时出错:", err);
			return res.status(500).send(createMessage(500, "服务器错误"));
		}
		if (result.length == 0) {
			return res.status(400).send(createMessage(400, "用户不存在"));
		}
		const userInfo = result[0];
		res.send(createMessage(200, "获取用户信息成功", { ...userInfo }));
	});
});

module.exports = router;
