const multer = require("multer");
const COS = require("cos-nodejs-sdk-v5");
const { v4: uuid } = require("uuid");
const { createMessage } = require("../utils/message");
const db = require("./db");
const cos = new COS({
	SecretId: process.env.COS_SECRET_ID,
	SecretKey: process.env.COS_SECRET_KEY,
})

const storage = multer({ storage: multer.memoryStorage() }).array("files");

function uploadMiddleware(req, res) {
	return new Promise((resolve, reject) => {
		storage(req, res, async (err) => {
			if (err) {
				console.error(err);
				return res.status(500).send(createMessage(500, `服务器错误: ${err}`));
			}

			if (!req.files) {
				return res.status(400).send(createMessage(400, "请上传文件"));
			}

			resolve(req.files);
		});
	})
}

function upload(buffer, filename = uuid(), mimetype = "application/octet-stream") {
	return new Promise((resolve, reject) => {
		cos.putObject({
			Bucket: process.env.COS_BUCKET,
			Region: process.env.COS_REGION,
			Key: filename,
			Body: buffer,
			ContentDisposition: "inline;filename=" + filename,
			ContentType: mimetype,
			ACL: "public-read"
		}, (err, data) => {
			if (err) {
				reject(err);
			}
			setTimeout(() => {
				resolve(data.Location);
			}, 1000)
		})
	})
}


module.exports = { uploadMiddleware, upload };
