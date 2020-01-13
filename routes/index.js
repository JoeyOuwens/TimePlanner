'use strict';
var express = require('express');
var router = express.Router();
var Token = require('../models/token');
const TimeTableItems = require('../models/timetable_item');

/* GET home page. */
router.get('/', function (req, res, next) {
    /* Redirect user to another page when he/she is logged in */
    if (req.session.user !== undefined)
        res.redirect('/dashboard/');
    else
        res.render('index');
});

/* GET offline page. */
router.get('/offline', async function (req, res) {
    //res.sendFile('public/offline.html');


    var context = { title: 'Offline Rooster' };

    if (req.session.user !== undefined)
        context.timetable_days = await get_scedule_for_user(req.session.user.id);

    res.render('offline', context);
});


async function get_scedule_for_user(userid) {
    const week_day_name = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
    var begin_date = new Date();
    var end_date = new Date();
    let days = [];

    begin_date.setHours(0, 0, 0, 0);
    end_date.setDate(end_date.getDate() + 8);
    end_date.setHours(0, 0, 0, 0);
    /* Get the upcomming 7 days that the user is sceduled to work and add new values to the user model that contain their start and end hours/minutes and add it to the items variable */
    let items = await TimeTableItems.query()
        .where('user_id', userid)
        .where('begin_date', '>=', begin_date.toISOString().replace('T', ' ').replace('Z', ''))
        .where('end_date', '<=', end_date.toISOString().replace('T', ' ').replace('Z', '')).then((values) => {
            values.forEach((item, index, array) => {
                item.begin_time = new Date(item.begin_date).toTimeString().split(' ')[0].split(/(.+):/)[1];
                item.end_time = new Date(item.end_date).toTimeString().split(' ')[0].split(/(.+):/)[1];
                array[index] = item;
            });
            return values;
        });

    /* For loop for the upcomming 7 days that will be displayed on the dashboard */
    for (let i = 0; i < 7; i++) {
        /* Create today and tomorrow variables */
        var current_date = new Date();
        var next_date = new Date();

        /* Set correct dates for the variables*/
        current_date.setDate(current_date.getDate() + i);
        current_date.setHours(0, 0, 0, 0);
        next_date.setDate(next_date.getDate() + i + 1);
        next_date.setHours(0, 0, 0, 0);

        /* Add day X object to the days array with the name of the week */
        days[i] = { day_name: week_day_name[current_date.getDay()], day_count: i, day_items: [] };

        /* Loop through all timetable entries and check if their day is  */
        for (let j = 0; j < items.length; j++) {
            let item = items[j];
            if (Date.parse(item.begin_date) >= current_date.getTime() && Date.parse(item.begin_date) <= next_date.getTime()) {
                days[i].day_items.push(item);
            }
        }
    }
    return days;
}

module.exports = router;