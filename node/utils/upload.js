const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// 创建一个用于存储上传文件的 Multer 实例
const storage = multer.diskStorage({
	destination: "public/uploads",
	filename: (req, file, cb) => {
		const ext = file.originalname.slice(file.originalname.lastIndexOf("."));
		const filename = uuidv4() + ext;
		cb(null, filename);
	},
});
const upload = multer({ storage }).array("files");

module.exports = upload