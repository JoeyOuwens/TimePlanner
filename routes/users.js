'use strict';
var express = require('express');
var router = express.Router();
var login = require('../controller/authenticate/login');
var validation = require('../classes/validation');
var resetTokenHandler = require('../classes/resetToken');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* Login user */
router.post('/login', async function (req, res, next) {

    console.log(req.body)
    const username = req.body.username;
    let loginResult = await login(username, req.body.password);

    if (loginResult) {
            res.render('users', { username: username });
        }
        else {
            res.render('index', { error: true });
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