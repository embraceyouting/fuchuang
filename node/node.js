const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql');

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
    password: "LR159753246810",
    database: 'datatest1',
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
        // 将文件路径存储到数据库
        req.files.forEach(file => {
            const imagePath = 'uploads/' + file.filename; // 构建文件路径，相对于 public 目录
            // 执行数据库插入操作
            const sql = "INSERT INTO images (path) VALUES (?)";
            db.query(sql, [imagePath], function (err, result) {
                if (err) {
                    console.error('Error inserting into database:', err);
                    return res.status(500).send('Error inserting into database.');
                }
                console.log('Image path inserted into database.');
            });
        });
        // 响应客户端
        res.status(200).send('Files uploaded successfully.');
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




// app.post('/submit_imgpost', function(req, res) {
//     // 处理文件上传
//     upload(req, res, function(err) {
//         if (err) {
//             console.error('Error uploading files:', err);
//             return res.status(500).send('Error uploading files.');
//         }
//         // 文件上传成功
//         console.log(req.files)
//         // 将文件路径存储到数据库
//         req.files.forEach(file => {
//             const imagePath = file.path.replace(/^public\\/, ''); // 去除路径中的 'public' 部分
//             // 执行数据库插入操作，假设您使用MySQL数据库
//             const sql = "INSERT INTO images (path) VALUES (?)";
//             db.query(sql, [imagePath], function(err, result) {
//                 if (err) {
//                     console.error('Error inserting into database:', err);
//                     return res.status(500).send('Error inserting into database.');
//                 }
//                 console.log('Image path inserted into database.');
//             });
//         });        
//     });
// });