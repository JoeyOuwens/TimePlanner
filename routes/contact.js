'use strict';
var express = require('express');
var router = express.Router();





/*GET contact page */
router.get('/', function (req, res) {
    if (res.locals.userInfo === undefined)
        res.render('contact', { error: false, hidenav: true });
    else
        res.render('contact', { error: false });
});

module.exports = router;
