'use strict';
var express = require('express');
var router = express.Router();
var userDBHandler = require('../../classes/userDBHandler')

//var users = [{ id: 1, name: 'Jack the Picker', function: 'Wasser',  email: "jackyboy@gmail.com", hours: 168, dob: "7-7-1888", rights: "manager" },
//    { id: 2, name: 'Elon Musk', function: 'Entrepreneur', email: "emusk@spacex.com", hours: 168, dob: "29-6-1971", rights: "medewerker" },
//    { id: 3, name: 'Paul Herbert', function: 'Ober', email: "PHerbert@gmail.com", hours: 18, dob: "12-4-1997", rights: "medewerker" }]; 
var userHasPageAccess = true;
var userRights = "OWNER";


/* GET users page. */
router.get('/', async function (req, res) {
    if (req.session.user !== undefined) {
        var userList = await userDBHandler.getAllUsers()
        res.render('usermanagement/list', { title: 'Medewerkers', users: userList, userRights: req.session.user.role });
    }
    else {
        return res.redirect('/');
    }

});


module.exports = router;
