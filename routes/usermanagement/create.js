'use strict';
var express = require('express');
var emailHandler = require('../../classes/emailHandler');
var generatePassword = require('password-generator');
var validation = require('../../classes/validation');
var router = express.Router();

var User = require('../../models/user');

/* GET create user page. */
router.get('/', function (req, res) {
    if (req.session.user.role !== "USER") {
        res.render('usermanagement/create', { title: 'Nieuwe medewerker', newPage: true });
    } else {

        return res.redirect('/');
    }
});

router.post('/', async function (req, res) {
    var password = generatePassword(Math.floor(Math.random() * 10) + 8, false);
    var accountDetails = req.body;
    if (req.session.user.role === "MANAGER") {
        accountDetails.inputRights = "USER";
    }

    accountDetails.inputZipcode = accountDetails.inputZipcode.replace(/\s/g, '');
    var failedFields = fieldValidation(accountDetails);
    if (failedFields.length === 0) {
        await User.query().insert({
            password: await User.generateHashedPassword(password),
            firstname: accountDetails.inputFname,
            middlename: accountDetails.inputMname,
            lastname: accountDetails.inputLname,
            email: accountDetails.inputEmail.toLowerCase(),
            employed_since: String(new Date().toISOString().substr(0, 10)),
            birth_date: accountDetails.inputDOB,
            address: accountDetails.inputAddress,
            zip: accountDetails.inputZipcode,
            place: accountDetails.inputPlace,
            contract_hours: accountDetails.inputWorkHours,
            phone_number: accountDetails.inputTelephone,
            function: accountDetails.inputFunction,
            role: accountDetails.inputRights,
            profile_image: '',
            salary: accountDetails.inputSalary,
            active: true
        }).then(() => {
            emailHandler.sendNewAccountEmail(accountDetails.inputEmail, accountDetails.inputFname, password);
            handlePageStayCheck(req.body.checkPageStay, res);
        }).catch((ex) => {
            console.log(ex);
            const message = ex.code === "SQLITE_CONSTRAINT" ? "Er bestaat al een gebruiker met het ingevulde emailaders." : "Er is wat fout gegaan met een medewerker toevoegen, probeer opnieuw.";
            res.render('usermanagement/create', { title: 'Nieuwe medewerker', throwError: true, errorMessage: message, accountDetails: accountDetails, failedFields: failedFields });
        });

    } else {
        res.render('usermanagement/create', { title: 'Nieuwe medewerker', throwError: true, errorMessage: "\u00C9\u00E9n of meerdere velden zijn onjuist ingevuld.", failedFields: failedFields, accountDetails: accountDetails });
    }
});

function handlePageStayCheck(checkPageStay, res) {
    if (checkPageStay) {
        res.render('usermanagement/create', { title: 'Nieuwe medewerker', throwSuccess: true, newPage: true, failedFields: [] });
    } else {
        return res.redirect('/usermanagement/list');
    }
}

function fieldValidation(details) {
    var failed = [];
    if (!validation.zipcode(details.inputZipcode)) {
        failed.push("inputZipcode");
    }
    if (!validation.date(details.inputDOB)) {
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

}

module.exports = router;