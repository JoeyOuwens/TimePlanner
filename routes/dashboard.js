'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var context = { title: 'Dashboard' };

    if (req.session.logged_in !== undefined) {
        delete req.session.logged_in;
        context.log_in_redirect = true;
    }
    res.render('dashboard', context);
});

module.exports = router;
