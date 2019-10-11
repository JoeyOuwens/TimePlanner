'use strict';
var express = require('express');
var emailHandler = require('../../classes/emailHandler');
var generatePassword = require('password-generator');
var router = express.Router();


/* TEMP VARIABLES CHANGE WITH AN ACTUAL FUNCTION */
var userHasPageAccess = true;  
var userRights = "OWNER"; 
var validationPassed = true; 
var insertedIntoDB = true; 

/* GET create user page. */
if (userHasPageAccess) {
    router.get('/', function (req, res) {
        res.render('usermanagement/create', { title: 'Nieuwe medewerker', userRights : userRights });
    });
} else {
    router.get('/', function (req, res) {
        return res.redirect('/');
    });
}

router.post('/', function (req, res) { 
    console.log(req.body);

    var password = generatePassword(Math.floor(Math.random() * 10) + 8, false);
    var accountDetails = req.body;
    if (validationPassed) {
        if (insertedIntoDB) {
            emailHandler.sendNewAccountEmail(accountDetails.inputEmail, accountDetails.inputFname, password);
        }     
    }

    if (req.body.checkPageStay) {
        return res.redirect('/usermanagement/create');
    } else {
        return res.redirect('/usermanagement/list');
    }
});

module.exports = router;
