'use strict';
var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function (req, res, next) {
    res.render('TEST', { error: false });
});

module.exports = router;