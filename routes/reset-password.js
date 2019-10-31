'use strict';
var express = require('express');
var router = express.Router();  
var tokenHandler = require('../classes/resetToken')

/* GET reset page. */
    router.get('/', function (req, res) {
        res.redirect('index'));
    });

    router.get('/token/:token', function (req, res) {
        if (tokenHandler.exists(req.params.token)) {
            res.render('reset-password', { title: req.params.token });
        } else {
            res.render('reset-password', { title: "Error!", error: true, errorMessage: "Token is invalid!" });
        }
    });



module.exports = router;
