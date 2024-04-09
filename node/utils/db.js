const { Pool } = require("pg");

const db = new Pool({
	connectionString:
		"postgres://default:j29qnplRAJCG@ep-rapid-cloud-a1k79pyv-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require",
});

db.connect((err, client) => {
	if (err) {
		console.error("Error connecting to database: " + err.stack);
		return;
	}

	// users
	// id||username||password||email
	const createUsersSql = `CREATE TABLE IF NOT EXISTS users (id SERIAL  PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255) NOT NULL, avatar VARCHAR(255))`;

	// files
	// id||time||filename||path||website||uid||path_pdf||score
	const createFilesSql = `CREATE TABLE IF NOT EXISTS files (id SERIAL PRIMARY KEY, time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, filename VARCHAR(255), path VARCHAR(255), website VARCHAR(255), uid INT NOT NULL, FOREIGN KEY(uid) REFERENCES users(id),path_pdf VARCHAR(255),score INT)`;

	client.query(createUsersSql);
	client.query(createFilesSql);
});

// const mysql = require("mysql");

// const db = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: process.env.MYSQL_PASSWORD,
// 	database: process.env.MYSQL_DATABASE,
// });

// db.connect(function (err) {
// 	if (err) {
// 		console.error("Error connecting to database: " + err.stack);
// 		return;
// 	}
// 	console.log("Connected to database as id " + db.threadId);

// 	// users
// 	// id||username||password||email
// 	const createUsersSql = `CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255) NOT NULL, avatar VARCHAR(255))`;

// 	// files
// 	// id||time||filename||path||website||uid||path_pdf||score
// 	const createFilesSql = `CREATE TABLE IF NOT EXISTS files (id INT AUTO_INCREMENT PRIMARY KEY, time DATETIME DEFAULT CURRENT_TIMESTAMP, filename VARCHAR(255), path VARCHAR(255), website VARCHAR(255), uid INT NOT NULL, FOREIGN KEY(uid) REFERENCES users(id),path_pdf VARCHAR(255),score INT)`;

// 	db.query(createUsersSql);
// 	db.query(createFilesSql);
// });

module.exports = db;