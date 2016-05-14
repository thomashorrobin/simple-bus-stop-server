var http = require('http');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://104.131.179.136:27017/busdb';
var port = process.env.port || 1337;

http.createServer(function (req, res) {
    let query = url.parse(req.url, true);
    if (query.pathname == '/stops') {
        if (query.query.search) {
            //res.end(JSON.stringify(query));
            search(query.query.search, res)
        } else {
            list(res);
        }
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Path not found.'}));
    }
}).listen(port);

function list(res) {
    MongoClient.connect(dburl, function(err, db) {
        if (err) {
            res.statusCode = 500
            res.end(JSON.stringify(err));
        }
        db.collection('stops').find({}).toArray(function (err, docs) {
            if (err == null) {
                res.end(JSON.stringify(docs));
            } else {
                res.statusCode = 500
                res.end("there was an error, contact Tom on 0273364706");
            }
        });
    });
}

function search(searchTerm, res) {
    MongoClient.connect(dburl, function(err, db) {
        if (err) {
            res.statusCode = 500
            res.end(JSON.stringify(err));
        }
        db.collection('stops').find({}).toArray(function (err, docs) {
            if (err == null) {
                var stops = [];
                for (var index = 0; index < docs.length; index++) {
                    var stop = docs[index];
                    if (stop.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        stops.push(stop);
                    }
                } 
                res.end(JSON.stringify(stops));
            } else {
                res.statusCode = 500
                res.end("there was an error, contact Tom on 0273364706");
            }
        });
    });
}