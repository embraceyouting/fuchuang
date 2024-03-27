const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const db = require("../utils/db");
const { createMessage } = require("../utils/message");

router.get('/:id', function (req, res) {
    const messageId = req.params.id;
    const sql =
        "select path_pdf from files where id = ?";
    db.query(
        sql,
        [messageId],
        function (err, result) {
            if (err) {
                return res.status(500).send(createMessage(500, "查询数据库时出错。"));
            }

            else if (result.length === 0 || result[0].path_pdf === null) {
                //如果是第一次打开pdf，此时没有在后端存下pdf,拿到json文件，使用jspdf生成pdf然后传给后端
                // 构建 JSON 文件的绝对路径
                const jsonFilePath = path.join(__dirname, '../../test_json/point.json');
                // 读取本地 JSON 文件
                fs.readFile(jsonFilePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error("Error reading file:", err);
                        res.status(500).send(createMessage(500, "读取 JSON 文件时出错。", null));
                        return;
                    }

                    try {
                        // 解析 JSON 数据
                        const jsonData = JSON.parse(data);

                        // 将解析后的 JSON 数据作为响应发送给客户端
                        res.send(createMessage(200, "获取 JSON 成功。", jsonData));
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                        res.status(500).send(createMessage(500, "解析 JSON 数据时出错。", null));
                    }
                });
            }
            else {
                //如果后端已经存好了pdf，把这个路径返回，用iframe直接嵌入
                return res.status(200).send(createMessage(200, "查询当前项目的pdf文档成功。", result[0]));
            }
        }
    );
});

const upload = multer({
    dest: 'public/pdf/',
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/pdf/');
        },
        filename: function (req, file, cb) {
            const ext = file.originalname.slice(file.originalname.lastIndexOf("."));
            const filename = uuidv4() + ext;
            cb(null, filename);
        }
    })
});

// POST 请求处理
router.post('/:id', upload.single('file'), function (req, res) {
    const messageId = req.params.id;
    const sql =
        "update files set path_pdf = ? where id =?";
    db.query(
        sql,
        [req.file.filename,messageId],
        function (err, result) {
            if (err) {
                return res
                    .status(500)
                    .send(createMessage(500, "添加项目的pdf路径失败"));
            }
        }
    );
    console.log('Message ID:', messageId);
    console.log('Uploaded File:', req.file);
    res.send(createMessage(200, "文件添加项目的pdf路径成功。", req.file.filename));
});

module.exports = router;
