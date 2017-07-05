var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    bunyan = require('bunyan'),
    mongoose = require('mongoose'),
    server = require('http').createServer(app).listen(process.env.PORT || 8080);

    var log = bunyan.createLogger({
        name: 'gad',
        streams: [{
            level: 'debug',
            stream: process.stdout
        }, {
            level: 'warn',
            path: 'err.log'
        }]
    });

    app.use(function (req, res, next) {
        if (req.url === '/favicon.ico') {
            res.writeHead(200, {'Content-Type': 'image/x-icon'});
            res.end();
        } else {
            next();
        }
    });

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    app.use(function (req, res, next) {
        var oneof = false;

        if (req.headers.origin) {
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            oneof = true;
        }
        if (req.headers['access-control-request-method']) {
            res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
            oneof = true;
        }
        if (req.headers['access-control-request-headers']) {
            res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
            oneof = true;
        }
        if (oneof) {
            res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
        }

        // intercept OPTIONS method
        if (oneof && req.method == 'OPTIONS') {
            res.sendStatus(200);
        }
        else {
            next();
        }
    });


    app.use('/gad', express.static(path.join(__dirname + '/gad')));

    app.get('/api/menu', function(req,res){
       res.send('surendra');
    });

    log.debug(__dirname);

    log.debug('server is running port 8080');

    mongoose.connect('mongodb://firstapp-3166:pR)83(bBz$oZ$6X{9x$Dd8{9}qQ@db-firstapp-3166.nodechef.com:5436/firstapp');
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;

    db.once('open', function callback() {
         log.warn({data: 'database connected successfully'});
    })

    db.on('error', function (err) {
        log.warn({err: err});
    })