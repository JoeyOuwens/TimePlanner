'use strict';
var express = require('express');
var router = express.Router();


/*GET termsofuse page */
router.get('/', function (req, res) {
    if (res.locals.userInfo === undefined)
        res.render('termsofuse', { title: 'Terms of Use', hidenav: true });
    else
        res.render('termsofuse', { title: 'Terms of Use' });
});



module.exports = router;