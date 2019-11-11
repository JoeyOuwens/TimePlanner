'use strict';
var express = require('express');
var router = express.Router();
var userDBHandler = require('../../classes/userDBHandler')


/* GET page. */
router.get('/delete/:id',  function (req, res) {
    if (req.session.user.role == 'OWNER' || req.session.user.role == 'MANAGER') {
        userDBHandler.deactivateUserById(req.params.id);
    }
    res.redirect('/usermanagement/list');

});
router.get('/activate/:id', function (req, res) {
    if (req.session.user.role == 'OWNER' || req.session.user.role == 'MANAGER') {
        userDBHandler.activateUserById(req.params.id);
    }
    res.redirect('/usermanagement/list');

});

module.exports = router;
