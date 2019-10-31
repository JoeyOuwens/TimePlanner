'use strict';
var express = require('express');
var router = express.Router();  
var tokenHandler = require('../classes/resetToken')

/* GET reset page. */
    router.get('/', function (req, res) {
        res.redirect('/index');
    });

    router.get('/token/:token', async function (req, res) { 
        if (await tokenHandler.exists(req.params.token)) {
            res.render('reset-password', { title: "Reset wachtwoord", token: req.params.token });
        } else {
            res.render('reset-password', { title: "Error!", error: true, errorMessage: "Token is invalid!" });
        }
    });

router.post('/reset', async function (req, res) {

    var passwordFieldOne = req.body.passwordField1
    var passwordFieldTwo = req.body.passwordField2
    var token = req.body.token
    if (passwordFieldOne == passwordFieldTwo && passwordFieldOne.length > 5) {
        await tokenHandler.passwordReset(token,passwordFieldOne);
    }
    
        res.render('reset-password', { title: "Hoera!", success: true });
});



module.exports = router;
