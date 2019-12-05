'use strict';
var userDBHandler = require('../../classes/userDBHandler');
var knex = require('../../db/knex');

class Edit {

    static async get(req, res) {
        var user = await knex('timetable_items').select().where('id', req.params.timetable_id).first();
        if (req.session.user.role === 'USER' || user === undefined)
            res.redirect('/rooster/');

        console.log(user);

        res.render('rooster/add-user', { title: "Inroostering bewerken", user_list: await userDBHandler.getAllUsers(), user: user, userid: req.params.timetable_id, editing: true });
    }

    static async post(req, res) {
        var user = await knex('timetable_items').select().where('id', req.params.timetable_id).first();
        if (req.session.user.role === 'USER' || user === undefined)
            res.redirect('/rooster/');


        if (req.body.begin_date >= req.body.end_date) {
            res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers(), user: user, error: "Begintijd mag niet later zijn dan eindtijd", success: false, editing: true });
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