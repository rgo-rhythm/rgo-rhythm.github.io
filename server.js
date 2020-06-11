var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = '';

var port = 3000;
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url);
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    })
}).listen(port);

console.log("Server listening on port", port);

var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "19wlqgodqn"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let query = "INSERT INTO ...";
    conn.query(query, function(err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
});