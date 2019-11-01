'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('profile', { user: req.session.user, page: 'overview' });
});

router.get('/changesettings/', function (req, res, next) {
    res.render('profile', { user: req.session.user, page: 'changesettings' });

});

router.get('/tasks/', function (req, res, next) {
    res.render('profile', { user: req.session.user, page: 'tasks' });

});

router.get('/help/', function (req, res, next) {
    res.render('profile', { user: req.session.user, page: 'help' });

});



module.exports = router;