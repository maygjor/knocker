'use strict';
var express = require('express');
var engines = require('consolidate');
let webpack = require('webpack');
let config = require('./webpack.config');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let expressReactHelper = require('express-react-helper');
let expressValidator = require('express-validator');
let session = require('express-session');
let passport = require('passport');
let localStrategy = require('passport-local');
let flash = require('connect-flash');
var path = require('path');
let mongodb = require('mongodb');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webapp:58147');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
app.use(expressValidator());
// view engine setup

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.engine('.ejs', engines.ejs); 

/*/Webpack setup 
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true }
}))
app.use(webpackHotMiddleware(compiler, {
    log: console.log
}))*/

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(expressReactHelper.setup());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Express Session
app.use(session({ secret: 'software engineering', saveUninitialized: true, resave: true }));
//Passport init
app.use(passport.initialize());
app.use(passport.session());
//Connect Flash
app.use(flash());
//routes
app.use('/', routes);
app.use('/users', users);

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
        console.log(err.message)
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




//Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        let namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));




//Global Flash Variables
app.use((req, res, next) => {
    res.locals.success_msg= req.flash('success','successfull');
    res.locals.error_msg = req.flash('error_msg','unknown error');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    req.flash('nothing', " ");
    next();
});

module.exports = app;
