'use strict';
var knex = require('../../db/knex');

class Index {
    static async get(req, res, next) {
        const timetable_items = await knex.select().from('timetable_items');
        const timetable_users = await knex.select('*').from('timetable_items').leftJoin('users', 'timetable_items.user', 'users.id');
        let timetable_list = [];

        for (let i = 0; i < timetable_items.length; i++) {
            timetable_list.push({ "title": timetable_users[i].firstname + ' ' + timetable_users[i].lastname, "start": timetable_items[i].begin_date, "end": timetable_items[i].end_date });
        }

        res.render('rooster',
            {
                title: 'Rooster',
                timeTable: JSON.stringify(timetable_list)
            });
    }
}

module.exports = Index;