"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express = require("express");
const path = require("path");
const index_1 = require("./routes/index");
const test_1 = require("./routes/test");
const graph_1 = require("./routes/graph");
const gauge_1 = require("./routes/gauge");
const pie_1 = require("./routes/pie");
const bar_1 = require("./routes/bar");
const doughnut_1 = require("./routes/doughnut");
const horizontalBar_1 = require("./routes/horizontalBar");
const radialGauge_1 = require("./routes/radialGauge");
const progressBar_1 = require("./routes/progressBar");
const line_1 = require("./routes/line");
var app = express();
var bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index_1.default);
app.use('/test', test_1.default);
app.use('/graph', graph_1.default);
app.use('/gauge', gauge_1.default);
app.use('/pie', pie_1.default);
app.use('/bar', bar_1.default);
app.use('/doughnut', doughnut_1.default);
app.use('/horizontalBar', horizontalBar_1.default);
app.use('/radialGauge', radialGauge_1.default);
app.use('/progressBar', progressBar_1.default);
app.use('/line', line_1.default);
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
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
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
//# sourceMappingURL=server.js.map