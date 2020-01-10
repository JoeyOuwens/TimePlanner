'use strict';
var TimeTableItems = require('../../models/timetable_item');

class Index {
    static async get(req, res, next) {
        let timetable_list = [];

        await TimeTableItems.query().eager('user').then((items) => {
            items.forEach((item) => {
                timetable_list.push(
                    {
                        "title": item.user.getFullName(),
                        "start": item.begin_date,
                        "end": item.end_date,
                        "timetable_id": item.id
                    });
            });
        }); 
        res.render('rooster',
            {
                title: 'Rooster',
                timeTable: JSON.stringify(timetable_list)
            });
    }
}

module.exports = Index;