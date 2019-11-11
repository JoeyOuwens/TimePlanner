'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    delete req.session.user;
    res.redirect('/');
});
module.exports = router;