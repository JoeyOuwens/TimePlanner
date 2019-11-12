'use strict';
var express = require('express');
var router = express.Router();
var userDBHandler = require('../classes/userDBHandler');
var knex = require('../db/knex');

router.get('/', function (req, res, next) {
    res.render('rooster');
});

router.get('/add-user', async function (req, res, next) {
    res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers() });
});

router.post('/add-user', async function (req, res, next) {
    await knex('timetable_items').insert([
        {
            user: req.body.user,
            begin_date: req.body.begin_date,
            end_date: req.body.end_date,
            comment: req.body.comment
        }]);

    if (req.body.stay_on_page === 'on')
        res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers(), success: true });
    else
        res.redirect('/rooster/');
});
module.exports = router;