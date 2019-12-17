'use strict';
var express = require('express');
var router = express.Router();
var User = require('../../models/User');

/* GET users page. */
router.get('/', async function (req, res) { 
    res.render('usermanagement/list', {
        title: 'Medewerkers',
        users: await User.query().orderBy(
            [{
                column: 'lastname',
                order: 'asc'
            }, {
                column: 'active',
                order: 'desc'
            }])
    });
});

module.exports = router;
