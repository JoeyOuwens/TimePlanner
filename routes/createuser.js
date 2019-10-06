'use strict';
var express = require('express');
var router = express.Router();

var userHasPageAccess = true;
var userRights = "MANAGER";

/* GET create user page. */
if (userHasPageAccess) {
    router.get('/', function (req, res) {
        res.render('createuser', { title: 'Nieuwe medewerker', userRights : userRights });
    });
} else {
    router.get('/', function (req, res) {
        return res.redirect('/');
    });
}

router.post('/', function (req, res) { 
    console.log(req.body);
    if (req.body.checkPageStay) {
        return res.redirect('/usermanagement/create');
    } else {
        return res.redirect('/usermanagement/list');
    }
});

module.exports = router;
