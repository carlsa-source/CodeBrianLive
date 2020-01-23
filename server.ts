
import debug = require('debug');
import express = require('express');
import path = require('path');

import routes from './routes/index';
import test from './routes/test';
import graph from './routes/graph';
import gauge from './routes/gauge';
import pie from './routes/pie';
import bar from './routes/bar';
import doughnut from './routes/doughnut';
import horizontalBar from './routes/horizontalBar';
import radialGauge from './routes/radialGauge';
import progressBar from './routes/progressBar';
import line from './routes/line';

var app = express();
var bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/test', test);
app.use('/graph', graph);
app.use('/gauge', gauge);
app.use('/pie', pie);
app.use('/bar', bar);
app.use('/doughnut', doughnut);
app.use('/horizontalBar', horizontalBar);
app.use('/radialGauge', radialGauge);
app.use('/progressBar', progressBar);
app.use('/line', line);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

debug('HOPE YOU SEE THIS');

const port = process.env.PORT || 3000;
app.set('port', port);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});


//import http = require('http');


//var port = process.env.port || 1337
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);