'use strict';
var express = require('express');
var router = express.Router();
var userDBHandler = require('../classes/userDBHandler');
var knex = require('../db/knex');

router.get('/', async function (req, res, next) {
    const timetable_items = await knex.select().from('timetable_items');
    const timetable_users = await knex.select('*').from('timetable_items').leftJoin('users', 'timetable_items.user', 'users.id');
    let timetable_list = [];

    for (let i = 0; i < timetable_items.length; i++) {
        timetable_list.push({ "title": timetable_users[i].firstname + ' '+ timetable_users[i].lastname, "start": timetable_items[i].begin_date, "end": timetable_items[i].end_date });
    }

    res.render('rooster',
        {   
            title: 'Rooster',
            timeTable: JSON.stringify(timetable_list)
        });
});

router.get('/add-user', async function (req, res, next) {
    if (req.session.user.role === 'USER')
        res.redirect('/rooster/');

    res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers() });
});

router.post('/add-user', async function (req, res, next) {
    if (req.session.user.role === 'USER') 
        res.redirect('/rooster/');

    if (req.session.begin_date >= req.session.end_date) {
        res.render('add-user');
    } else {
        await knex('timetable_items').insert([
            {
                user: req.body.user,
                begin_date: req.body.begin_date,
                end_date: req.body.end_date,
                comment: req.body.comment
            }]);
    }

    

    if (req.body.stay_on_page === 'on')
        res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers(), success: true });
    else
        res.redirect('/rooster/');
});
module.exports = router;