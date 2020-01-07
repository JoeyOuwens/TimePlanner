'use strict';
var express = require('express');
var router = express.Router();
var userDBHandler = require('../../classes/userDBHandler')
var validation = require('../../classes/validation');
var User = require('../../models/user');
var DayOffRequest = require('../../models/dayoffrequest');


/* GET page. */
router.get('/delete/:id', async function (req, res) {
    
    if (!res.locals.userInfo.isUser()) { 
        if (await allowedToChange(res.locals.userInfo, req.params.id)){
            (await User.query().findById(req.params.id)).deactivate();
        }
    }
    res.redirect('/usermanagement/list');

});
router.get('/activate/:id', async function (req, res) {
    if (!res.locals.userInfo.isUser()) {
        if (await allowedToChange(res.locals.userInfo, req.params.id)) {
            (await User.query().findById(req.params.id)).activate();
        }
    }
    res.redirect('/usermanagement/list');
});


router.get('/edit/:id', async function (req, res) {
    if (!res.locals.userInfo.isUser()) {
        if (await allowedToChange(res.locals.userInfo, req.params.id)) {
            var user = await User.query().findById(req.params.id);
            res.render('usermanagement/edit', { title: `Aanpassen - ${user.getFullName()}`, user: user, failedFields: [] });
        } else {
            res.redirect('/usermanagement/list');
        }
    } else {
        res.redirect('/usermanagement/list');
    }
});


router.post('/edit/:id', async function (req, res) {
    var user = await User.query().findById(req.params.id);
    const failedFields = fieldValidation(req.body);
    req.body.zip = req.body.zip.replace(/\s/g, ''); 
    if (failedFields.length === 0) {
        if (await User.query().patchAndFetchById(req.params.id, req.body)) {
            res.redirect('/usermanagement/list');
        } else {
            res.render('usermanagement/edit', { title: `Aanpassen - ${user.getFullName()}`, throwError: true, errorMessage: "Er is wat fout gegaan met aanpassen, probeer opnieuw.", failedFields: failedFields, user: req.body });
        }
    } else {
        res.render('usermanagement/edit', { title: `Aanpassen - ${user.getFullName()}`, throwError: true, errorMessage: "\u00C9\u00E9n of meerdere velden zijn onjuist ingevuld.", failedFields: failedFields, user: req.body });
    }
});



module.exports = router;


async function allowedToChange(requestingUser, changingUserId) {
    var changingUser = await User.query().findById(changingUserId);

    if (
        changingUser.isOwner() ||
        requestingUser.isUser() ||
        (requestingUser.isManager() && changingUser.isOwner()) ||
        (requestingUser.isManager() && changingUser.isManager()) ||
        requestingUser.id === changingUser.id)
        return false;
    return true;
};


function fieldValidation(details) {
    var failed = [];
    if (!validation.zipcode(details.zip)) {
        failed.push("zip");
    }
    if (!validation.date(details.birth_date)) {
        failed.push("birth_date");
    }
    if (!validation.date(details.employed_since)) {
        failed.push("employed_since");
    }
    if (!validation.hours(details.contract_hours)) {
        failed.push("contract_hours");
    }
    if (details.role !== undefined && !validation.rights(details.role)) {
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