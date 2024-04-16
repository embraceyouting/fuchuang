const multer = require("multer");
const COS = require("cos-nodejs-sdk-v5");
const { v4: uuid } = require("uuid");
const { createMessage } = require("../utils/message");
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
				return res.status(500).send(createMessage(500, "服务器错误"));
			}

			if (!req.files) {
				return res.status(400).send(createMessage(400, "请上传文件"));
			}

			const files = req.files.map(file => {
				return new Promise((resolve, reject) => {
					cos.putObject({
						Bucket: process.env.COS_BUCKET,
						Region: process.env.COS_REGION,
						Key: file.originalname,
						Body: file.buffer,
						ContentLength: file.size,
						ContentType: file.mimetype,
						ACL: "public-read"
					}, (err, data) => {
						if (err) {
							reject(err);
						}
						resolve(data);
					})
				})
			})
			try {
				const data = await Promise.all(files);
				resolve(data.map((item, index) => ({
					...req.files[index],
					...item
				})))
			} catch (e) {
				reject(e)
			}
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
				resolve(data);
			}, 1000)
		})
	})
}


module.exports = { uploadMiddleware, upload };
