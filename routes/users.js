'use strict';
var express = require('express');
var router = express.Router();
var login = require('../controller/authenticate/login');
var validation = require('../classes/validation');
var resetTokenHandler = require('../classes/resetToken');

var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log(req.sessionID); 
    console.log(req.session); 
    if (req.session.user !== undefined)
        res.render('users', { username: req.session.user.firstname + ' ' + req.session.user.lastname });
    else
        res.redirect('/');
});

/* Login user */

router.post('/', async function (req, res, next) {
    console.log(req.session);
    const username = req.body.username;
    const password = req.body.password;
    let loginResult = await login(username, password);

    if (loginResult) {
        if (req.session.user === undefined) {
            req.session.user = await User.query().where('email', username).first();
        }
        
        res.redirect('/dashboard');
    } else {
        res.render('index', { error: true});
    }
});


router.post('/reset', function (req, res) {

    var email = req.body.inputEmail
    if (validation.email(email)) {
        resetTokenHandler.generateFor(email)
    }
    res.redirect('/');
});
module.exports = router; 