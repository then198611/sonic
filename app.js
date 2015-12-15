var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var log4js = require('log4js');

var setRoute = require('./modules/setRoute');//设置路由
var config = require('./modules/config');//配置
var log4js_config = require('./modules/log4js.json');//log4js config

var app = express();

process.env.PORT = config.PORT;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);//set html as template
app.set('view engine', 'html'); //set html as template

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/promotion',express.static(__dirname + '/promotion'));
app.use(express.static(path.join(__dirname, 'public')));


log4js.configure(log4js_config);
var logfile = log4js.getLogger('log_file');
/*logfile.trace('This is trace');
logfile.debug('This is debug');
logfile.info('This is info');
logfile.warn('This is warn');
logfile.error('This is error');*/

setRoute(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
