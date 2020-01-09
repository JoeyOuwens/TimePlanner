'use strict';
var knex = require('../../db/knex');

class RequestSubstitute {
    static async get(req, res) {
        let data = getSubstituteList();
        res.render('requestsubstitute', { title: "Vervangingslijst", substituteList : data });

    }
    static async post(req, res, next) {
        let id = req.body.id
        let timetableUser = await knex.select('timetable_items.user')
            .from("timetable_items").where('id', id);
        if (timetableUser[0].user == req.session.user.id) {
            let substitute = await knex.select().from('substitute').where('timetable_item', id);
            if (substitute.length == 0) {
                await knex('substitute').insert([
                    {
                        requesting_user: req.session.user.id,
                        replaced_by_user: req.session.user.id,
                        creation_datetime: new Date(),
                        timetable_item: req.body.id,
                        status: 'AWAITING_REPLACEMENT',
                        comment: ''
                    }]).catch(function (e) { console.log(e) });
            }
        }
       
    }
    
}

async function getSubstituteList() {
    const RequestSubstitute = await RequestSubstitute.query()
        .eager('[requesting_user, replaced_by_user, timetable_item]')
        .then(function (data) { return data; })
        .catch(function (e) { console.log(e) });
    return RequestSubstitute;
}

module.exports = RequestSubstitute;