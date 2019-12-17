'use strict';
var userDBHandler = require('../../classes/userDBHandler');
var availabilityHandler = require('../../classes/availabilityHandler');
var knex = require('../../db/knex');

class Edit {

    static async get(req, res) {
        var user = await knex('timetable_items').select().where('id', req.params.timetable_id).first();
        if (req.session.user.role === 'USER' || user === undefined)
            res.redirect('/rooster/');

        const timetable_items = await knex.select().from('timetable_items');
        const timetable_users = await knex.select('*').from('timetable_items').leftJoin('users', 'timetable_items.user', 'users.id');
        let timetable_list = [];

        for (let i = 0; i < timetable_items.length; i++) {
            timetable_list.push({ "title": timetable_users[i].firstname + ' ' + timetable_users[i].lastname, "start": timetable_items[i].begin_date, "end": timetable_items[i].end_date });
        }

        res.render('rooster/add-user', { title: "Inroostering bewerken", user_list: await userDBHandler.getAllUsers(), availability: await availabilityHandler.retreiveAll(), user: user, userid: req.params.timetable_id, editing: true, timeTable: JSON.stringify(timetable_list) });
    }

    static async post(req, res) {
        var user = await knex('timetable_items').select().where('id', req.params.timetable_id).first();
        if (req.session.user.role === 'USER' || user === undefined)
            res.redirect('/rooster/');


        if (req.body.begin_date >= req.body.end_date) {
            res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers(), availability: await availabilityHandler.retreiveAll(), user: user, error: "Begintijd mag niet later zijn dan eindtijd", success: false, editing: true });
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