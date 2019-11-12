'use strict';
var express = require('express');
var router = express.Router();
var userDBHandler = require('../../classes/userDBHandler')


/* GET users page. */
router.get('/', async function (req, res) {
    if (req.session.user !== undefined) {
        var userList = await userDBHandler.getAllUsers()
        res.render('usermanagement/list', { title: 'Medewerkers', users: userList });
    }
    else {
        return res.redirect('/');
    }

});


module.exports = router;
