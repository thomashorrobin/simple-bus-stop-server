var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://104.131.179.136:27017/busdb';
var port = process.env.port || 1337;

http.createServer(function (req, res) {
    MongoClient.connect(url, function(err, db) {
        db.collection('stops').find({}).toArray(function (err, docs) {
            if (err == null) {
                res.end(JSON.stringify(docs));
            } else {
                res.end("there was an error, contact Tom on 0273364706");
            }
        });
    });
}).listen(port);