const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql');
const { buffer } = require('stream/consumers');

const app = express();
app.use(cors());
app.use(express.static('public'));

// 创建一个用于存储上传文件的 Multer 实例
const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        const ext = file.originalname.slice(file.originalname.lastIndexOf('.'));
        const filename = uuidv4() + ext;
        cb(null, filename)
    }
});
const upload = multer({ storage }).array('files');

// 链接数据库
const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// 数据库链接是否成功
db.connect(function (err) {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + db.threadId);
});

// 使用 Multer 中间件处理上传文件
app.post('/submit_jsonpost', function (req, res) {
    // 处理文件上传
    upload(req, res, function (err) {
        if (err) {
            console.error('Error uploading files:', err);
            return res.status(500).send('Error uploading files.');
        }
        // 文件上传成功
        console.log(req.files);
        // 获取上传的用户名，您可以根据实际情况从请求中获取
        const username = req.body.username;
        // 将文件路径和用户名存储到数据库
        req.files.forEach(file => {
            const jsonPath = 'uploads/' + file.filename; // 构建文件路径，相对于 public 目录
            const filename = Buffer.from( file.originalname,'latin1').toString('utf-8');
            // 执行数据库插入操作
            const sql = "INSERT INTO files (username, path, filename) VALUES (?, ?, ?)";
            db.query(sql, [username, jsonPath, filename], function (err, result) {
                if (err) {
                    console.error('Error inserting into database:', err);
                    return res.status(500).send('Error inserting into database.');
                }
                console.log('File information inserted into database.');
            });
        });
        // 响应客户端
        res.status(200).send('Files uploaded successfully.');
    });
});


app.get('/subject', (req, res) => {
    // 执行查询以从数据库中获取路径
    const sql = "SELECT filename FROM files"; // 根据您的数据库模式调整查询
    db.query(sql, (err, results) => {
        if (err) {
            console.error('从数据库中获取路径时出错:', err);
            return res.status(500).send('从数据库中获取路径时出错。');
        }
        // 将结果以JSON格式发送回客户端
        res.send(results);
    });
});

app.delete('/subject/delete', (req, res) => {
    // 从请求的查询参数中获取文件名
    const { filename } = req.query;
    console.log(filename);
    // 检查filename是否提供
    if (!filename) {
    return res.status(400).send('文件名未提供。');
    }
    // 构建用于删除记录的SQL查询
    const sql = "DELETE FROM files WHERE filename = ?";
    // 执行查询，使用文件名作为参数
    db.query(sql, [filename], (err, result) => {
    if (err) {
    console.error('删除数据库记录时出错:', err);
    return res.status(500).send('删除数据时出错。');
    }
    // 判断是否成功删除数据
    if (result.affectedRows === 0) {
    return res.status(404).send('未找到匹配的文件名，删除失败。');
    } else {
    res.send('文件已成功删除。');
    }
    });
});

// 启动服务器
const server = app.listen(8000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('---host---', host);
    console.log('---port---', port);
});

// 在 Express 服务器关闭时断开数据库连接
server.on('close', function () {
    db.end(function (err) {
        if (err) {
            console.error('Error closing database connection: ' + err.stack);
            return;
        }
        console.log('Database connection closed.');
    });
});
