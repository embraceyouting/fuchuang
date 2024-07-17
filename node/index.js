const express = require("express");
const cors = require("cors");
const db = require("./utils/db.js");
const routes = require("./routes");
const JWT = require("./utils/JWT.js");
const { createMessage } = require("./utils/message.js");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const whiteList = [
	{ path: "/login", method: "POST" },
	{ path: "/user", method: "POST" },
	{ path: "/cover", method: "GET" },
];

app.use((req, res, next) => {
	if (req.method === "OPTIONS") {
		res.sendStatus(200);
		return;
	}
	next();
})

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Expose-Headers", "Authorization");
	next();
});

app.use((req, res, next) => {
	if (whiteList.some((item) => req.path.includes(item.path) && req.method === item.method)) {
		next();
		return;
	}
	const token =
		req.headers.authorization?.split(" ")[1] ||
		req.params.token ||
		req.query.token;
	try {
		const payload = JWT.verify(token);
		if (!payload) {
			throw new Error("invalid token");
		}
		const user = {
			id: payload.id,
			username: payload.username,
			email: payload.email,
			avatar: payload.avatar,
		};
		req.user = user
		const newToken = JWT.generate({...user});
		res.setHeader("Authorization", newToken);
		res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		res.setHeader("Pragma", "no-cache");
		res.setHeader("Expires", "0");
		next();
	} catch (err) {
		return res.status(401).send(createMessage(401, "请登录"));
	}
});

app.use("/api", routes);

// 启动服务器
const server = app.listen(8000, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log("---host---", host);
	console.log("---port---", port);
});

// 在 Express 服务器关闭时断开数据库连接
server.on("close", function () {
	db.end(function (err) {
		if (err) {
			console.error("Error closing database connection: " + err.stack);
			return;
		}
		console.log("Database connection closed.");
	});
});

process.on('uncaughtException', (err) => {
	console.error('Caught Exception: ' + err);
})

module.exports = app;
