'use strict';
var express = require('express');
var router = express.Router();

var users = [{ id: 1, name: 'Jack the Ripper', function: 'Wasser', fulltime: true, email: "jackyboy@gmail.com", hours: 168, dob: "7-7-1888", rights: "manager" },
               { id: 2, name: 'Elon Musk', function: 'Legend', fulltime: true, email: "emusk@spacex.com", hours: 168, dob: "29-6-1971", rights: "medewerker" }]; 
var userHasPageAccess = true;
var userRights = "OWNER";


/* GET users page. */
if (userHasPageAccess) {
    router.get('/', function (req, res) {
        res.render('usermanagement/list', { title: 'Medewerkers', users: users, userRights: userRights});
    });
} else {
    router.get('/', function (req, res) {
        return res.redirect('/');
    });
}
 


module.exports = router;
