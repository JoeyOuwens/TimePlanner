'use strict';
var express = require('express');
var router = express.Router(); 
const WorkReplacement = require('../models/work_replacement');
const TimeTableItem = require('../models/timetable_item');
var validation = require('../classes/validation')
var EVALUATING_STATUS_CODE = "EVALUATING"
class SubstituteRequests {
    static async get(req, res, next) {
        if (isUserOwnerOrManager(req.session.user.role)) {
            var workReplacementRequests = await getWorkReplacementRequests();
            //console.log(workReplacementRequests)
            res.render('approve', { title: 'Goedkeuren', changeRequests: workReplacementRequests, page: 'changeRequests' });
        } else {
            res.redirect('/dashboard');
        }

    }

    static async post(req, res, next) {
        if (isUserOwnerOrManager(req.session.user.role)) {
            await WorkReplacement.query()
                .where('id', req.body.id)
                .update({ status: req.body.status, comment: req.body.status_comment })
                .then(function () {
                    if (req.body.status == "APPROVED") {
                        updateTimeTable(req.body)
                    }
                })
                .catch(function (e) { console.log(e); }); 
            res.redirect('/');
        }
    }

}
module.exports = SubstituteRequests;



function isUserOwnerOrManager(role) {
    if (role == "OWNER" || role == "MANAGER") {
        return true;
    } else {
        return false;
    }
}

async function updateTimeTable(info) {
    const workReplacementRequest = await WorkReplacement.query().select().where('id', info.id).first();
    //console.log(workReplacementRequest);
    await TimeTableItem.query().where('id', workReplacementRequest.timetable_item).update({ user: workReplacementRequest.replaced_by_user });

}


async function getWorkReplacementRequests() {
    const workReplacementRequests = await WorkReplacement.query()
        .eager('[requestingUser, replacedByUser,timeTableItem]')
        .then(function (data) { return data; })
        .catch(function (e) { console.log(e) });

    return workReplacementRequests;
}
