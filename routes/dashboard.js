'use strict';
var express = require('express');
var router = express.Router();

const User = require('../models/user');
const TimeTableItems = require('../models/timetable_item');


/* GET upcomming work scedule for the user, along with other important functionalities. */
router.get('/', async function (req, res, next) {
    var context = { title: 'Dashboard' };

    context.timetable_days = await res.locals.userInfo.get_week_scedule();
    context.newest_users = await User.query().orderBy('employed_since', 'desc').limit(10);

    /* Check if the user has been redirected after a login, if so, show a greeting/message */
    if (req.session.logged_in !== undefined) {
        delete req.session.logged_in;
        context.log_in_redirect = true;
    } 
    res.render('dashboard', context);
});

module.exports = router;
