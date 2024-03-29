var express = require('express');
var cors = require("express-cors");
var redis = require('redis'),
    redisClient = redis.createClient(6379, '' + process.env.REDIS_PORT_6379_TCP_ADDR);

var program = require('commander');

program
    .version('0.0.1')
    .option('-s, --style', 'Style to serve: bold|italic', 'bold')
    .option('-p, --port', 'port to listen on', 3000);

if (program.style != 'bold' && program.style != 'italic') {
    console.log('unknown style choice');
    process.exit(1);
}

var markup = 'strong';
if (program.style === 'italic') {
    markup = 'em';
}

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

app.post('/' + program.style, function (req, res) {
    var start = new Date().getTime();
    var text = req.body.text || '';

    res.setHeader("Access-Control-Allow-Origin", "*");
    redisClient.incr(program.style + '_count', function (err, reply) {
        var end = new Date().getTime();;
        var elapsed = end - start;
        if (err) {
            res.send({
                error: true,
                text: "sorry, there was a problem reaching the database: " + err,
                redisDelayMS: elapsed
            });
        }
        res.send({
            text: '<' + markup + '>' + text + '</' + markup + '>',
            redisDelayMS: elapsed,
            count: reply
        });
    });
});

app.listen(program.port);
console.log('Listening on port ' + program.port + '...');
