'use strict';
var express = require('express');
var router = express.Router();
var Token = require('../models/token');
var Users = require('../models/user');
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

    var context = { title: 'Offline Rooster' };

    if (req.session.user !== undefined)
        context.timetable_days = await res.locals.userInfo.get_week_scedule();

    var resource_list = [];
    await Users.query().where("active", "=", true)
        .then((users) => {
            users.forEach((user) => {
                resource_list.push({
                    "id": user.id,
                    "title": user.getFullName()
                });
            });
        });

    context.resources = JSON.stringify(resource_list);

    var timetable_list = [];
    let first_day_of_week = new Date();
    first_day_of_week.setHours(0, 0, 0, 0);
    first_day_of_week.setDate(first_day_of_week.getDate() - first_day_of_week.getDay() + (first_day_of_week.getDay() === 0 ? -6 : 1));
    let first_day_of_next_week = new Date();
    first_day_of_next_week.setHours(0, 0, 0, 0);
    first_day_of_next_week.setDate(first_day_of_week.getDate() + 7);

    console.log(first_day_of_week);
    console.log(first_day_of_next_week);

    await TimeTableItems.query().eager('user')
        .where('begin_date', '>=', first_day_of_week.toISOString().replace('T', ' ').replace('Z', ''))
        .where('end_date', '<=', first_day_of_next_week.toISOString().replace('T', ' ').replace('Z', ''))
        .then(async (items) => {

            for (let item of items) {

                timetable_list.push(
                    {
                        "title": createEventTitle(item),
                        "start": item.begin_date,
                        "end": item.end_date,
                        "id": item.id,
                        "resourceId": item.user.id,
                        "comment": item.comment,
                        "user_id": item.user.id,
                        "color": "#00aedb"
                    });
            };
        });


    context.events = JSON.stringify(timetable_list);

    res.render('offline', context);
});


function createEventTitle(item) {
    //Creates a title with HH:MM - HH:MM
    return `${new Date(item.begin_date).getHours()}:${String(new Date(item.begin_date).getMinutes()).length == 1 ? "0" + String(new Date(item.begin_date).getMinutes()) : String(new Date(item.begin_date).getMinutes())} - ${new Date(item.end_date).getHours()}:${String(new Date(item.end_date).getMinutes()).length == 1 ? "0" + String(new Date(item.end_date).getMinutes()) : String(new Date(item.end_date).getMinutes())}`;


}
module.exports = router;