'use strict';
var express = require('express');
var knexjs = require('../db/knex');
var router = express.Router();
var $ = require('jquery');

/* GET upcomming work scedule for the user, along with other important functionalities. */
router.get('/', async function (req, res, next) {
    var context = { title: 'Dashboard' };

    context.timetable_days = get_scedule_for_user(req.session.user.id);

    /* Check if the user has been redirected after a login, if so, show a greeting/message */
    if (req.session.logged_in !== undefined) {
        delete req.session.logged_in;
        context.log_in_redirect = true;
    }

    res.render('dashboard', context);
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
    let items = await knexjs.select().from('timetable_items')
        .where('user', userid)
        .andWhere('begin_date', '>=', begin_date.toISOString().replace('T', ' ').replace('Z', ''))
        .andWhere('end_date', '<=', end_date.toISOString().replace('T', ' ').replace('Z', '')).then((values) => {
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
