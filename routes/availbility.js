'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const multer = require('multer');
const User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('profile', { title: 'Profiel Overzicht', page: 'overview' });
});

module.exports = router;
