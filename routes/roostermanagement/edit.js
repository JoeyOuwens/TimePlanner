'use strict';
var availabilityHandler = require('../../classes/availabilityHandler');
var knex = require('../../db/knex');
var User = require('../../models/user');
var TimeTableItem = require('../../models/timetable_item');

class Edit {

    static async get(req, res) {
        var user = await knex('timetable_items').select().where('id', req.params.timetable_id).first();
        if (req.session.user.role === 'USER' || user === undefined)
            res.redirect('/rooster/');

        let timetable_list = [];
        await TimeTableItem.query().eager('user').then((list) => {
            list.forEach((item) => {
                timetable_list.push({ "title": item.user.getFullName(), "start": item.begin_date, "end": item.end_date });
            });
        });

        res.render('rooster/add-user', { title: "Inroostering bewerken", user_list: await User.query().where({ active: true }), availability: await availabilityHandler.retreiveAll(), user: user, userid: req.params.timetable_id, editing: true, timeTable: JSON.stringify(timetable_list) });
    }

    static async post(req, res) {
        var user = await knex('timetable_items').select().where('id', req.params.timetable_id).first();
        if (req.session.user.role === 'USER' || user === undefined)
            res.redirect('/rooster/');


        if (req.body.begin_date >= req.body.end_date) {
            res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await User.query().where({ active: true }), availability: await availabilityHandler.retreiveAll(), user: user, error: "Begintijd mag niet later zijn dan eindtijd", success: false, editing: true });
            return;
        }

        await knex('timetable_items').where('id', req.params.timetable_id).update({
            begin_date: req.body.begin_date,
            end_date: req.body.end_date,
            comment: req.body.comment
        });

        res.redirect('/rooster/');
    }

}

module.exports = Edit;