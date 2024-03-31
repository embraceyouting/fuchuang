const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { createMessage } = require("../utils/message");

const jsonFilePath = path.join(__dirname, "../../test_json/datas.json");
router.get('/', function (req, res){
    // 读取JSON文件
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            res.status(500).send(createMessage(500, "数据获取失败", err));
        }

        try {
            const jsonData = JSON.parse(data);
            res.status(200).send(createMessage(200, "数据获取成功", jsonData));
        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            res.status(500).send(createMessage(500, "转换json文件失败", parseErr));
        }
    });
});

module.exports = router;
 