'use strict';
var express = require('express');
var router = express.Router();  
var tokenHandler = require('../classes/resetToken')

/* GET reset page. */
    router.get('/', function (req, res) {
        res.redirect('/index');
    });

    router.get('/token/:token', async function (req, res) { 
        if (await tokenHandler.exists(req.params.token)) {
            res.render('reset-password', { title: "Reset wactwoord", token: req.params.token });
        } else {
            res.render('reset-password', { title: "Error!", error: true, errorMessage: "Token is invalid!" });
        }
    });

router.post('/reset', async function (req, res) {
    
        res.render('reset-password', { title: "Hoera!", success: true });
});



module.exports = router;
