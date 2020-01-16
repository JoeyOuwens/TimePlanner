'use strict';
var knex = require('../../db/knex');
var availabilityHandler = require('../../classes/availabilityHandler');
var User = require('../../models/user');
var TimeTableItem = require('../../models/timetable_item');
const rooster_index = require('./index');

class Add {

    static async get(req, res, next) {
        if (req.session.user.role === 'USER')
            res.redirect('/rooster/');

        res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await User.query().where({ active: true }), availability: await availabilityHandler.retreiveAll(), resources: JSON.stringify(await rooster_index.getResourceList()) });
    }

    static async post(req, res, next) {
        if (req.session.user.role === 'USER')
            res.redirect('/rooster/');

        if (req.body.begin_date >= req.body.end_date) {
            res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await User.query().where({ active: true }), resources: JSON.stringify(await rooster_index.getResourceList()), availability: await availabilityHandler.retreiveAll(), user: req.body, error: "Begintijd mag niet later zijn dan eindtijd", success: false });
            return;
        }

        await TimeTableItem.query().insert(
            {
                user_id: req.body.user_id,
                begin_date: req.body.begin_date,
                end_date: req.body.end_date,
                comment: req.body.comment
            });

        if (req.body.stay_on_page === 'on') {
            res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await User.query().where({ active: true }), resources: JSON.stringify(await rooster_index.getResourceList()), availability: await availabilityHandler.retreiveAll(), success: true });

        }
        else
            res.redirect('/rooster/');
    }

}

module.exports = Add;

