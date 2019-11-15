'use strict';
var express = require('express');
var router = express.Router();
var userDBHandler = require('../../classes/userDBHandler')
var validation = require('../../classes/validation')


/* GET page. */
router.get('/delete/:id',  async function (req, res) {
    if (req.session.user.role == 'OWNER' || req.session.user.role == 'MANAGER') { 
        if (await allowedToChange(req.session.user, req.params.id)){
            userDBHandler.deactivateUserById(req.params.id);
        }
    }
    res.redirect('/usermanagement/list');

});
router.get('/activate/:id', async function (req, res) {
    if (await allowedToChange(req.session.user, req.params.id)) {
        userDBHandler.activateUserById(req.params.id);
    }
    res.redirect('/usermanagement/list');

});


router.get('/edit/:id', async function (req, res) {
    if (await allowedToChange(req.session.user, req.params.id)) {
        var user = await userDBHandler.getUserById(req.params.id)
        res.render('usermanagement/edit', { title: 'Aanpassen', user: user[0] });
    } else {
        res.redirect('/usermanagement/list');
    }
});


router.post('/edit/:id', async function (req, res) {
    req.body.id = req.params.id 
    req.body.zip = req.body.zip.replace(/\s/g, ''); 
    var failedFields = fieldValidation(req.body);
    if (failedFields.length == 0) {
        if (userDBHandler.updateUser(req.body)) {
            res.redirect('/usermanagement/list');
        } else {
            res.render('usermanagement/edit', { title: 'Aanpassen', throwError: true, errorMessage: "Er is wat fout gegaan met aanpassen, probeer opnieuw.", failedFields: failedFields, user: req.body });
        }
    } else {
        res.render('usermanagement/edit', { title: 'Aanpassen', throwError: true, errorMessage: "\u00C9\u00E9n of meerdere velden zijn onjuist ingevuld.", failedFields: failedFields, user: req.body });
    }
});



module.exports = router;


async function allowedToChange(requestingUser, changingUserId) {
    var changingUser = await userDBHandler.getUserById(changingUserId)
    if ((requestingUser.role == 'MANAGER' && changingUser[0].role == "OWNER") || (requestingUser.role == 'MANAGER' && changingUser[0].role == "MANAGER") || (requestingUser.id == changingUser[0].id)) {
        return false
    } else {
        return true
    }
};


function fieldValidation(details) {
    var failed = [];
    if (!validation.zipcode(details.zip)) {
        failed.push("zip");
    }
    if (!validation.birthdate(details.birth_date)) {
        failed.push("birth_date");
    }
    if (!validation.birthdate(details.employed_since)) {
        failed.push("employed_since");
    }
    if (!validation.hours(details.contract_hours)) {
        failed.push("contract_hours");
    }
    if (!validation.rights(details.role)) {
        failed.push("role");
    }
    if (!validation.telephone(details.phone_number)) {
        failed.push("phone_number");
    }
    if (!validation.email(details.email)) {
        failed.push("email");
    }
    if (!validation.place(details.place)) {
        failed.push("place");
    }
    if (!validation.address(details.address)) {
        failed.push("address");
    }
    if (!validation.firstName(details.firstname)) {
        failed.push("firstname");
    }
    if (!validation.middleName(details.middleName)) {
        failed.push("middleName");
    }
    if (!validation.lastName(details.lastName)) {
        failed.push("lastName");
    }
    return failed;

}