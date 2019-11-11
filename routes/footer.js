'use strict';
var express = require('express');
var router = express.Router();


/*GET termsofuse page */
router.get('/', function (req, res) {
    if (userInfo === undefined)
        res.render('termsofuse', { error: false, hidenav: true });
    else
        res.render('termsofuse', { error: false});
});

module.exports = router;