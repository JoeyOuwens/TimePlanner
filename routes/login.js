'use strict';
var express = require('express');
var router = express.Router();
var validation = require('../classes/validation');
var resetTokenHandler = require('../classes/resetToken');

var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.redirect('/');
});

/* Login user */

router.post('/', async function (req, res, next) {
    var errors = [];
    const email = req.body.username.toLowerCase();
    const password = req.body.password;

    const user = await User.query().where({
        email: email,
        active: true
    }).first();

    if (user !== undefined) {
        if (await user.isPassword(password)) {
            if (req.session.user === undefined) {
                req.session.user = user;
                req.session.logged_in = true;
                if (req.session.user.profile_image === "") {
                    req.session.user.profile_image = "images/default_profileimage.jpg";
                }
            }

            res.redirect('/dashboard');
            return;
        } else {
            errors.push('Het ingevulde wachtwoord is onjuist. ');
        }
    } else {
        errors.push('Het emailadres is onjuist of het account is gedeactiveerd. ');
    }

    res.render('index', { errors: errors });
});


router.post('/reset', function (req, res) {
    var email = req.body.inputEmail;
    if (validation.email(email)) {
        resetTokenHandler.generateFor(email);
    }
    res.redirect('/');
});
module.exports = router; 