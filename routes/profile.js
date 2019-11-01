'use strict';
var express = require('express');
var validation = require('../classes/validation');
var router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('profile', { user: req.session.user, page: 'overview' });
});

router.get('/changesettings/', function (req, res, next) {
    res.render('profile', { user: req.session.user, page: 'changesettings' });

});

router.post('/changesettings/', async function (req, res, next) {
    let error; // the error can be false or a string
    let saved = false;
    let accountDetails = req.body;
    let id = req.body.userid;

    delete accountDetails.userid; // deletes value from accountDetails and req.body
    delete accountDetails.submit; // deletes value from accountDetails and req.body

    /* data should be validated before putting into the database */
    var failedFields = fieldValidation(accountDetails);
    if (failedFields.length === 0) {
        await User.query().patchAndFetchById(id, accountDetails).skipUndefined();
        let user = await User.query().where('id', id).first();
        req.session.user = user;

        saved = true;
   }

    res.render('profile', { user: req.session.user, page: 'changesettings', failedFields: failedFields, saved: saved });
});


router.get('/tasks/', function (req, res, next) {
    res.render('profile', { user: req.session.user, page: 'tasks' });

});

router.get('/help/', function (req, res, next) {
    res.render('profile', { user: req.session.user, page: 'help' });

});

function fieldValidation(details) {
    var failed = [];
    if (details.userid !== undefined) {
        failed.push("'userid'");
    }
    if (!validation.zipcode(details.zip)) {
        failed.push("'zip'");
    }
    if (!validation.birthdate(details.birth_date)) {
        failed.push("'birth_date'");
    }
    if (!validation.telephone(details.phone_number)) {
        failed.push("'phone_number'");
    }
    if (!validation.email(details.email)) {
        failed.push("'email'");
    }
    if (!validation.place(details.place)) {
        failed.push("'place'");
    }
    if (!validation.address(details.address)) {
        failed.push("'address'");
    }
    if (!validation.firstName(details.firstname)) {
        failed.push("'firstname'");
    }
    if (!validation.lastName(details.lastname)) {
        failed.push("'lastname'");
    }
    return failed;
}

/*Profile picture*/
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profilepic')
                .attr('src', e.target.result)
                .width(150)
                .height(150);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

module.exports = router;
