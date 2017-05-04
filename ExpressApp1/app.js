'use strict';
var express = require('express');
let exphbs = require('express-handlebars');
let expressValidator = require('express-validator');
let session = require('express-session');
let passport = require('passport');
let localStrategy = require('passport-local');
let flash = require('connect-flash');
var path = require('path');
let mongodb = require('mongodb');
let mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();

//Database setup
mongoose.connect('mongodb://localhost/webapp');
let db = mongoose.connection;
// view engine setup
/*app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); */
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs({ defaultLayout: 'index.ejs', layoutsDir: path.join(__dirname, 'views') }));

app.set('view engine', 'handlebars');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

//Express Session
app.use(session({ secret: 'software engineering', saveUninitialized: true, resave: true }));
//Passport init
app.use(passport.initialize());
app.use(passport.session());




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

//Connect Flash
app.use(flash());
//Global Flash Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



module.exports = app;
