const mysql = require("mysql");

// 链接数据库
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

// 数据库链接是否成功
db.connect(function (err) {
	if (err) {
		console.error("Error connecting to database: " + err.stack);
		return;
	}
	console.log("Connected to database as id " + db.threadId);

	// users
	// id||username||password||email
	const createUsersSql = `CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255) NOT NULL, avatar VARCHAR(255))`;

	// files
	// id||time||filename||path||website||uid
	const createFilesSql = `CREATE TABLE IF NOT EXISTS files (id INT AUTO_INCREMENT PRIMARY KEY, time DATETIME DEFAULT CURRENT_TIMESTAMP, filename VARCHAR(255), path VARCHAR(255), website VARCHAR(255), uid INT NOT NULL, FOREIGN KEY(uid) REFERENCES users(id))`;

	db.query(createUsersSql);
	db.query(createFilesSql);
});

module.exports = db;