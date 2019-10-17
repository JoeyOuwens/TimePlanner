'use strict';
var express = require('express');
var emailHandler = require('../../classes/emailHandler');
var generatePassword = require('password-generator');
var validation = require('../../classes/validation');
var router = express.Router();
var userDBHandler = require('../../classes/userDBHandler')


/* TEMP VARIABLES CHANGE WITH AN ACTUAL FUNCTION */
var userHasPageAccess = true;  
var userRights = "OWNER"; 
var validationPassed = true; 
var insertedIntoDB = true; 

/* GET create user page. */
if (userHasPageAccess) {
    router.get('/', function (req, res) { 
        res.render('usermanagement/create', { title: 'Nieuwe medewerker', userRights : userRights, newPage: true });
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

    accountDetails.inputZipcode = accountDetails.inputZipcode.replace(/\s/g, ''); 
    var failedFields = fieldValidation(accountDetails);
    if (failedFields.length == 0) {
        if (userDBHandler.insertUser(accountDetails, password)) {
            emailHandler.sendNewAccountEmail(accountDetails.inputEmail, accountDetails.inputFname, password);
            handlePageStayCheck(req.body.checkPageStay, res)
        } else {
            res.render('usermanagement/create', { title: 'Nieuwe medewerker', userRights: userRights, throwError: true, errorMessage: "Er is wat fout gegaan met een medewerker toevoegen, probeer opnieuw.", accountDetails: accountDetails });
        }
    } else {
        res.render('usermanagement/create', { title: 'Nieuwe medewerker', userRights: userRights, throwError: true, errorMessage:"\u00C9\u00E9n of meerdere velden zijn onjuist ingevuld.", failedFields: failedFields, accountDetails: accountDetails });
    }        
}); 

function handlePageStayCheck(checkPageStay,res) {
    if (checkPageStay) {
        res.render('usermanagement/create', { title: 'Nieuwe medewerker',throwSuccess: true, userRights: userRights, newPage: true });
    } else {
        return res.redirect('/usermanagement/list');
    }
}

function fieldValidation(details) {
    var failed = [];
    if (!validation.zipcode(details.inputZipcode)) {
        failed.push("inputZipcode");
    }
    if (!validation.birthdate(details.inputDOB)) {
        failed.push("inputDOB");
    }
    if (!validation.hours(details.inputWorkHours)) {
        failed.push("inputWorkHours");
    }
    if (!validation.rights(details.inputRights)) {
        failed.push("inputRights");
    }
    if (!validation.telephone(details.inputTelephone)) {
        failed.push("inputTelephone");
    }
    if (!validation.email(details.inputEmail)) {
        failed.push("inputEmail");
    }
    if (!validation.place(details.inputPlace)) {
        failed.push("inputPlace");
    }
    if (!validation.address(details.inputAddress)) {
        failed.push("inputAddress");
    }
    if (!validation.firstName(details.inputFname)) {
        failed.push("inputFname");
    }
    if (!validation.middleName(details.inputMname)) {
        failed.push("inputMname");
    }
    if (!validation.lastName(details.inputLname)) {
        failed.push("inputLname");
    }
    return failed;
     
};

module.exports = router;
