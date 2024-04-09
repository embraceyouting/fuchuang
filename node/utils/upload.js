const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

let storage, upload;
const uploadsDir = path.resolve(process.cwd(), "public/uploads");

try {
	storage = multer.diskStorage({
		destination: uploadsDir,
		filename: (req, file, cb) => {
			const ext = file.originalname.slice(
				file.originalname.lastIndexOf(".")
			);
			const filename = uuidv4() + ext;
			cb(null, filename);
		},
	});
	upload = multer({ storage }).array("files");
} catch (e) {
	console.error(e);
}

module.exports = upload;
