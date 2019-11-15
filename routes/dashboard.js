'use strict';
var express = require('express');
var knexjs = require('../db/knex');
var router = express.Router();


/* GET users listing. */
router.get('/', async function (req, res, next) {
    const week_day_name = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
    var begin_date = new Date();
    begin_date.setHours(0, 0, 0, 0);
    var end_date = new Date();
    end_date.setDate(end_date.getDate() + 8);
    end_date.setHours(0, 0, 0, 0);

    let items = await knexjs.select().from('timetable_items').where('user', req.session.user.id).where('begin_date', '>=', begin_date.toISOString().replace('T', ' ').replace('Z', ''))
        .andWhere('end_date', '<=', end_date.toISOString().replace('T', ' ').replace('Z', '')).then((values) => {
            values.forEach((item, index, array) => {
                item.begin_time = new Date(item.begin_date).toTimeString().split(' ')[0].split(/(.+):/)[1];
                item.end_time = new Date(item.end_date).toTimeString().split(' ')[0].split(/(.+):/)[1];
                array[index] = item;
            });

            return values;
        });

    console.log(items);
    console.log(req.session.user);

    let days = [];

    for (let i = 0; i < 7; i++) {
        var current_date = new Date();
        current_date.setDate(current_date.getDate() + i);
        current_date.setHours(0, 0, 0, 0);
        var next_date = new Date();
        next_date.setDate(next_date.getDate() + i + 1);
        next_date.setHours(0, 0, 0, 0);

        days[i] = { day_name: week_day_name[current_date.getDay()], day_count: i, day_items: [] };

        for (let j = 0; j < items.length; j++) {
            let item = items[j];
            if (Date.parse(item.begin_date) >= current_date.getTime() && Date.parse(item.begin_date) <= next_date.getTime()) {
                days[i].day_items.push(item);
            }
        }
    }

    res.render('dashboard', { timetable_days: days });
});

module.exports = router;
