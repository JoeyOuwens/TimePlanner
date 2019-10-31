'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { error: false });
});

/* GET offline page. */
router.get('/offline.html', function (req, res) {
    res.sendFile('public/offline.html');
});

module.exports = router;