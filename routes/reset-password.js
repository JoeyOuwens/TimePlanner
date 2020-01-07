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
    var token = await Token.query().where({
        token_serial: req.params.token,
        used: false
    }).first();
    if (token !== undefined) {
        if (token.isTokenExpired())
            res.render('reset-password', { title: "Error!", error: true, errorMessage: "Token is expired!" });
        else
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
    if (
        (await Token.query().where({
            token_serial: req.params.token,
            used: false
        }).first() !== undefined) &&

        passwordFieldOne === passwordFieldTwo &&
        passwordFieldOne.length > 5) {
        await resetTokenHandler.passwordReset(token, passwordFieldOne);
    }
    
    res.render('reset-password', { title: "Hoera!", success: true });
});



module.exports = router;
