'use strict';
var knex = require('../../db/knex');
var substitute = require('../../models/substitute');
var timetableItem = require('../../models/timetable_item');


class RequestSubstitute {
    static async get(req, res) {
        let data = await getSubstituteList();
        var begin_date = new Date();
        begin_date.setHours(0, 0, 0, 0); 
        let items = await knex.select().from('timetable_items')
            .where('user_id', req.session.user.id)
            .andWhere('begin_date', '>=', begin_date.toISOString())
            .then((values) => {
                values.forEach((item, index, array) => {
                    item.begin_time = new Date(item.begin_date).toTimeString().split(' ')[0].split(/(.+):/)[1];
                    item.end_time = new Date(item.end_date).toTimeString().split(' ')[0].split(/(.+):/)[1];
                    array[index] = item;
                });
                return values;
            }); 

        res.render('requestsubstitute', { title: "Vervangingslijst", substituteList : data, timetableItems: items });

    }
    static async post(req, res, next) {
        let id = req.body.id;
        let timetableUser = await knex.select('timetable_items.user_id')
            .from("timetable_items").where('id', id);  
        if (timetableUser[0].user_id == req.session.user.id) {
            let substitute = await knex.select().from('substitute').where('timetable_item', id);
            console.log(req.body.id);
            if (substitute.length == 0) { 
                var insertedSubstitute = await knex('substitute').insert([
                    {
                        requesting_user: req.session.user.id,
                        replaced_by_user: req.session.user.id,
                        creation_datetime: new Date(),
                        timetable_item: req.body.id,
                        status: 'AWAITING_REPLACEMENT',
                        comment: ''
                    }]).then(function () { 
                        return true;
                    }).catch(function (e) {
                        console.log(e)
                        return false;
                    });
                if (insertedSubstitute) {
                    handleResponseJson(res, true, "Het is goed gegaan, topper ben je.");
                } else {
                    handleResponseJson(res, false, "Het is fout gegaan, topper ben je.");
                }
            } else {
                handleResponseJson(res, false, "Je hebt al voor deze dag een aanvraag staan, topper ben je.");
            }
        } else {
            handleResponseJson(res, false, "Het is fout gegaan, topper ben je."); 
        } 
        handleResponseJson(res, false, "Er ging wat fout. Prutser ben je."); 

    }

    //TODO checks if user is not requesting user.
    //TODO rename? relocate to other file.
    static async takeOver(req, res, next) {
        await substitute.query().where('id', req.body.substituteId)
            .whereNot('requesting_user', req.session.user.id)
            .update({ status: "AWAITING_APPROVAL", replaced_by_user: req.session.user.id })
            .then(function () { 
                return true;
            })
            .catch(function (e) {
                console.log(e);
                return false;}); 

        res.send(JSON.stringify({success: true})); 
    }
}

module.exports = RequestSubstitute;

function handleResponseJson(res, success, message) {
    res.send(JSON.stringify({
        success: success,
        message: message
    }));

}

async function getSubstituteList() {
    const substituteList = await substitute.query()
        .eager('[requestingUser, replacedByUser, timetableItem]')
        .then(function (data) { return data; })
        .catch(function (e) { console.log(e) });

    console.log(substituteList)
    return substituteList;
}