'use strict';
var express = require('express');
var router = express.Router();  
var resetTokenHandler = require('../classes/resetToken');

var Token = require('../models/token');

/* GET reset page. */
router.get('/', function (req, res) {
    res.redirect('/index');
});

router.get('/token/:token', async function (req, res) {
    if (await resetTokenHandler.exists(req.params.token)) {
        res.render('reset-password', { title: "Reset wachtwoord", token: req.params.token });
    } else {
        res.render('reset-password', { title: "Error!", error: true, errorMessage: "Token is invalid!" });
    } 
});

router.post('/reset', async function (req, res) {
    var passwordFieldOne = req.body.passwordField1;
    var passwordFieldTwo = req.body.passwordField2;
    var token = req.body.token;
    // Check if both password fields are the same and the password is larger than 5 characters.
    // Change password with a function, allowing for easier implementation of hashing. 
    // Remove token when used. 
    if (await resetTokenHandler.exists(req.body.token) &&
        passwordFieldOne === passwordFieldTwo &&
        passwordFieldOne.length > 5) {
        await resetTokenHandler.passwordReset(token, passwordFieldOne);
    }
    
    res.render('reset-password', { title: "Hoera!", success: true });
});



module.exports = router;
