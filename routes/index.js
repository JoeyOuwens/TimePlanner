'use strict';
var express = require('express');
var router = express.Router(); 

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

    var context = { title: 'Offline Rooster' };

    if (req.session.user !== undefined)
        context.timetable_days = await res.locals.userInfo.get_week_scedule();

    let first_day_of_week = new Date();
    first_day_of_week.setHours(0, 0, 0, 0);
    first_day_of_week.setDate(first_day_of_week.getDate() - first_day_of_week.getDay() + (first_day_of_week.getDay() === 0 ? -6 : 1));
    let first_day_of_next_week = new Date();
    first_day_of_next_week.setHours(0, 0, 0, 0);
    first_day_of_next_week.setDate(first_day_of_week.getDate() + 7);

    context.resources = JSON.stringify(await rooster_index.getResourceList());

    context.events = JSON.stringify(await rooster_index.getTimeTableData(first_day_of_week, first_day_of_next_week));

    res.render('offline', context);
});
 
module.exports = router;