const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { createMessage } = require("../utils/message");

router.get('/:id', function (req, res){
    const messageId = req.params.id;
    console.log(messageId);

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
});

module.exports = router;
