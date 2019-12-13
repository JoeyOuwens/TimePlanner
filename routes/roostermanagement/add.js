'use strict';
var userDBHandler = require('../../classes/userDBHandler');
var knex = require('../../db/knex');
var availabilityHandler = require('../../classes/availabilityHandler');  

class Add {
    
    static async get(req, res, next) {
        if (req.session.user.role === 'USER')
            res.redirect('/rooster/');
        const timetable_items = await knex.select().from('timetable_items');
        const timetable_users = await knex.select('*').from('timetable_items').leftJoin('users', 'timetable_items.user', 'users.id');
        let timetable_list = [];

        for (let i = 0; i < timetable_items.length; i++) {
            timetable_list.push({ "title": timetable_users[i].firstname + ' ' + timetable_users[i].lastname, "start": timetable_items[i].begin_date, "end": timetable_items[i].end_date });
        }

        res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers(), availability: await availabilityHandler.retreiveAll(), timeTable: JSON.stringify(timetable_list) });
}

    static async post(req, res, next) {
        if (req.session.user.role === 'USER')
            res.redirect('/rooster/');

        if (req.body.begin_date >= req.body.end_date) {
            res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers(), availability: await availabilityHandler.retreiveAll(), user: req.body, error: "Begintijd mag niet later zijn dan eindtijd", success: false });
            return;
        }

        await knex('timetable_items').insert([
            {
                user: req.body.user,
                begin_date: req.body.begin_date,
                end_date: req.body.end_date,
                comment: req.body.comment
            }]);

        if (req.body.stay_on_page === 'on') {
            const timetable_items = await knex.select().from('timetable_items');
            const timetable_users = await knex.select('*').from('timetable_items').leftJoin('users', 'timetable_items.user', 'users.id');
            let timetable_list = [];

            for (let i = 0; i < timetable_items.length; i++) {
                timetable_list.push({ "title": timetable_users[i].firstname + ' ' + timetable_users[i].lastname, "start": timetable_items[i].begin_date, "end": timetable_items[i].end_date });
            }

            res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers(), availability: await availabilityHandler.retreiveAll(), success: true, timeTable: JSON.stringify(timetable_list)  });

        }
        else
            res.redirect('/rooster/');
    }

}

module.exports = Add;