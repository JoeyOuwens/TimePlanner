'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

//const redis = require('redis');
//const client = redis.createClient();
var contact = require('./routes/contactpageroute')
var routes = require('./routes/index');
var login = require('./routes/login');
var users = require('./routes/usermanagement/list');
var createuser = require('./routes/usermanagement/create');
var session = require('express-session');
const uuid = require('uuid/v4');
var dashboard = require('./routes/dashboard');
var profile = require('./routes/profile');
var passwordreset = require('./routes/reset-password');
var usermanagementedit = require('./routes/usermanagement/user');
var logout = require('./routes/logout');
var termsofuse = require('./routes/termsofuse');
var privacypolicy = require('./routes/pivacypolicy');
var rooster = require('./routes/rooster');


var app = express();

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user === undefined) {
        res.redirect('/');
    } else {
        next();
    }
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieSession({ secret: 'tobo!', cookie: { maxAge: 60 * 60 * 1000 } }));
app.use(function (req, res, next) {
    res.locals.userInfo = req.session.user;
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);  
app.use('/login', login);  
app.use('/usermanagement/list', sessionChecker, users);
app.use('/usermanagement/create', sessionChecker, createuser);
app.use('/usermanagement/user', sessionChecker, usermanagementedit);
app.use('/rooster', sessionChecker, rooster);
app.use('/dashboard', sessionChecker, dashboard);
app.use('/profile', sessionChecker, profile);
app.use('/user/resetpassword', sessionChecker, passwordreset);
app.use('/logout', sessionChecker, logout);
app.use('/termsofuse', termsofuse);
app.use('/privacypolicy', privacypolicy);
app.use('/contactpage', contact);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    } 
    next();
}); 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//parse requests
app.use(bodyParser.urlencoded({ extended: true }));

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

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});