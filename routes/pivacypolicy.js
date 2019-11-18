'use strict';
var express = require('express');
var router = express.Router();


/*GET privacypolicy page */
router.get('/', function (req, res) {
    if (res.locals.userInfo === undefined)
        res.render('privacypolicy', { error: false, hidenav: true });
    else
        res.render('privacypolicy', { error: false });
});



module.exports = router;