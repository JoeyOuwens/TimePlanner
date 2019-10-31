'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('profile', { error: true, username: req.session.user.firstname + ' ' + req.session.user.lastname});

});

module.exports = router;