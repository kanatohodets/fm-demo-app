var express = require('express');
var cors = require("express-cors");
var redis = require('redis'),
    redisClient = redis.createClient(6379, '' + process.env.REDIS_PORT_6379_TCP_ADDR);

var app = express();

app.use(cors({
    allowedOrigins: [
        'http://localhost:8000'
    ]
}))

app.configure(function () {
    app.use(express.bodyParser());
});

redisClient.on("error", function (err) {
    console.log('argh, an error! ' + err);
});

app.get('/', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end();
});

app.post('/italic', function (req, res) {
    var start = new Date().getTime();
    var text = req.body.text || '';

    res.setHeader("Access-Control-Allow-Origin", "*");
    redisClient.incr('italic_count', function (err, reply) {
        var end = new Date().getTime();;
        var elapsed = end - start;
        if (err) {
            res.send({
                error: true,
                text: "sorry, there was a problem",
                redisDelayMS: elapsed,
                count: reply
            });
        }
        res.send({
            text: '<em>' + text + '</em>',
            redisDelayMS: elapsed,
            count: reply
        });
    });
});

app.listen(4000);
console.log('Listening on port 4000...');
