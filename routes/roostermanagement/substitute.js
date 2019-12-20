'use strict';
const substitute = require('../../models/substitute');
var knex = require('../../db/knex');

class RequestSubstitute {
    static async get(req, res) {
        res.render('requestsubstitute', { title: "Vervangingslijst" });
    }
    static async post(req, res, next) {
        let id = req.body.id
        let timetableUser = await knex.select('timetable_items.user')
            .from("timetable_items").where('id', id);
        if (timetableUser[0].user == req.session.user.id) {
            await knex('substitute').insert([
            {
                requesting_user: req.session.user.id,
                replaced_by_user: req.session.user.id,
                creation_datetime: new Date(),
                timetable_item: req.body.id,
                status: 'AWAITING_REPLACEMENT',
                comment:''
                }]).catch(function (e) { console.log(e) });
        }
       
    }

    }



module.exports = RequestSubstitute;