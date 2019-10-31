'use strict';
var express = require('express');
var router = express.Router();
var login = require('../controller/authenticate/login');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* Login user */
router.post('/login', async function (req, res, next) {

    const username = req.body.username;
    let loginResult = await login(username, req.body.password);

    if (loginResult) {
        //res.render('users', { username: username });
        res.redirect('/dashboard');
        
        }
        else {
            res.render('index', { error: true });
        }
});

module.exports = router;