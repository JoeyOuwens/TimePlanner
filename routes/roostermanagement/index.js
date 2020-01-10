'use strict';
var TimeTableItems = require('../../models/timetable_item');

class Index {
    static async get(req, res, next) {
        //const timetable_items = await knex.select().from('timetable_items');
        //const timetable_users = await knex.select('*').from('timetable_items').leftJoin('users', 'timetable_items.user', 'users.id');
        let timetable_list = [];

        const timetable_users = await TimeTableItems.query().eager('user').then((items) => {
            items.forEach((item) => {
                timetable_list.push(
                    {
                        "title": item.user.getFullName(),
                        "start": item.begin_date,
                        "end": item.end_date,
                        "timetable_id": item.id,
                        "timetable_user_id": timetable_users[i].id
                    });
            });
            return items;
        });

        res.render('rooster',
            {
                title: 'Rooster',
                timeTable: JSON.stringify(timetable_list)
            });
    }
}

module.exports = Index;