'use strict';
var knex = require('../../db/knex');
var substitute = require('../../models/substitute');
var timetableItem = require('../../models/timetable_item');

class RequestSubstitute {
    static async get(req, res) {
        let data = await getSubstituteList();
        res.render('requestsubstitute', { title: "Vervangingslijst", substituteList : data });

    }
    static async post(req, res, next) {
        let id = req.body.id
        //let ti = await timetableItem.query('timetable_items.user').where('id', id)

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

    //TODO checks if user is not requesting user.
    //TODO rename? relocate to other file.
    static async takeOver(req, res, next) {
        await substitute.query().where('id', req.body.id)
            .update({ status: "AWAITING_APPROVAL", replaced_by_user: req.session.user.id })
            .then(function () { 
                return true;
            })
            .catch(function (e) {
                console.log(e);
                return false;}); 

        res.redirect("/substitute/list"); 
    }
}

module.exports = RequestSubstitute;


async function getSubstituteList() {
    const substituteList = await substitute.query()
        .eager('[requestingUser, replacedByUser, timetableItem]')
        .then(function (data) { return data; })
        .catch(function (e) { console.log(e) });

    console.log(substituteList)
    return substituteList;
}