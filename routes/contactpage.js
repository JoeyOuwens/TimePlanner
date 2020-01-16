'use strict';
var express = require('express');
var emailHandler = require('../classes/emailHandler');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('contactpage', { error: true });
});

router.post('/', function (req, res, next) {
    
    emailHandler.sendMessageToDevs(req.body.name,req.body.email,req.body.message)
    res.render('contactpage', );
});

module.exports = router;
