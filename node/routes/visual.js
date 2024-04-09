const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const { createMessage } = require("../utils/message");

router.get('', (req, res) => {
    const sql = "select website FROM files";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("查询数据库记录时出错:", err);
            return res
                .status(500)
                .send(createMessage(500, "查询数据库记录时出错。"));
        }
        if (result.affectedRows === 0) {
            return res.status(404).send(createMessage(404, "文件不存在。"));
        } else {
            res.send(createMessage(200, "查询成功", result));
        }
    });
});

module.exports = router;
