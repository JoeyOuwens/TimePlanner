'use strict';
var express = require('express');
var create = require('../routes/usermanagement/create');
var router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('profile', { user: req.session.user, page: 'overview' });
});

router.get('/changesettings/', function (req, res, next) {
    res.render('profile', { user: req.session.user, page: 'changesettings' });

});

router.post('/changesettings/', async function (req, res, next) {
    let error; // the error can be false or a string
    let saved = false;
    let accountDetails = req.body;
    let id = req.body.userid;

    delete accountDetails.userid; // deletes value from accountDetails and req.body
    delete accountDetails.submit; // deletes value from accountDetails and req.body

    await User.query().patchAndFetchById(id, accountDetails).skipUndefined();
    let user = await User.query().where('id', id).first();
    req.session.user = user;
    saved = true;

    /* data should be validated before putting into the database */

    res.render('profile', { user: req.session.user, page: 'changesettings', error: error, saved: saved});
});

router.get('/tasks/', function (req, res, next) {
    res.render('profile', { user: req.session.user, page: 'tasks' });

});

router.get('/help/', function (req, res, next) {
    res.render('profile', { user: req.session.user, page: 'help' });

});

module.exports = router;
