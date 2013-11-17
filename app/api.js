var express = require('express');
var redis = require('redis'),
    redisClient = redis.createClient(6379, 'localhost');
 
var app = express();

app.configure(function () {
    app.use(express.bodyParser());
});

redisClient.on("error", function (err) {
    console.log('argh, an error! ' + err);
});

app.post('/bold', function (req, res) {
    var start = new Date().getTime();
    var text = req.body.text || '';
    redisClient.incr('bold_count', function (err, reply) {
        var end = new Date().getTime();;
        var elapsed = end - start;
        res.send({
            text: '<strong>' + text + '</strong>',
            redisDelayMS: elapsed,
            count: reply
        });
    });
});

app.listen(3001);
console.log('Listening on port 3001...');
