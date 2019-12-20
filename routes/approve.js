﻿'use strict';
var express = require('express');
var router = express.Router();
var dayoffRequestHandler = require('../classes/dayoffRequestHandler')
const WorkReplacement = require('../models/work_replacement');
const TimeTableItem = require('../models/timetable_item');
var validation = require('../classes/validation')
var EVALUATING_STATUS_CODE = "In afwachting"

/*GET page */
router.get('/', async function (req, res) {
    if (isUserOwnerOrManager(req.session.user.role)) {
        var dayoffRequests = await getDayOffRequests();
        var changeRequests = await getWorkReplacementRequests();
        res.render('approve', { title: 'Goedkeuren', dayoffRequests: dayoffRequests, changeRequests: changeRequests, page: 'all'});
    } else {

        res.redirect('/dashboard');
    }

}); 


router.get('/dayoffrequests/', async function (req, res) {
    if (isUserOwnerOrManager(req.session.user.role)) {
        var dayoffRequests = await getDayOffRequests();
        res.render('approve', { title: 'Goedkeuren', dayoffRequests: dayoffRequests, page: 'dayoffRequests' });
    } else {
        res.redirect('/dashboard');
    }
});

router.get('/changeRequests/', async function (req, res) {
    if (isUserOwnerOrManager(req.session.user.role)) {
        var workReplacementRequests = await getWorkReplacementRequests();
        //console.log(workReplacementRequests)
        res.render('approve', { title: 'Goedkeuren', changeRequests: workReplacementRequests, page: 'changeRequests' });
    } else {
        res.redirect('/dashboard');
    }
});
router.post('/dayoffrequest', async function (req, res) { 
    if (isUserOwnerOrManager(req.session.user.role)) {
        await dayoffRequestHandler.updateStatus(req.body);
        res.redirect('/');
    }
}); 

router.post('/changerequest', async function (req, res) {
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
        //console.log(req.body);
        res.redirect('/');
    }
}); 

async function updateTimeTable(info) {
    const workReplacementRequest = await WorkReplacement.query().select().where('id', info.id).first();
    //console.log(workReplacementRequest);
    await TimeTableItem.query().where('id', workReplacementRequest.timetable_item).update({user: workReplacementRequest.replaced_by_user});

}

async function  getDayOffRequests() {
    var dayoffRequests = await dayoffRequestHandler.retreiveAll();
    isDateCreatedLessThenAWeek(dayoffRequests);
    dayoffRequests.sort((a) => (a.week_left) ? -1 : 1).sort((a, b) => (a.creation_date < b.creation_date) ? -1 : 1).sort((a) => (a.status == EVALUATING_STATUS_CODE) ? -1 : 1)
    changeDateToString(dayoffRequests);
    //console.log(dayoffRequests)
    return dayoffRequests;
};

async function getWorkReplacementRequests() { 
    const workReplacementRequests = await WorkReplacement.query()
        .eager('[requestingUser, replacedByUser,timeTableItem]') 
        .then(function (data) { return data; })
        .catch(function (e) { console.log(e) }); 

    return workReplacementRequests;
}

function isUserOwnerOrManager(role) {
    if (role == "OWNER" || role == "MANAGER") {
        return true;
    } else {
        return false;
    }
}

module.exports = router;

function flipDateFormat(date) {
    return date.split("-").reverse().join("-");
}

  


// Formats:
//creation_date: dd-mm-yyyy hh:mm:ss
//from: dd-mm-yyyy
//till: dd-mm-yyyy
function changeDateToString(data) {
    for (const request of data) {
        request.creation_date = flipDateFormat(fixDate(new Date(request.creation_date).toLocaleDateString())) + " " + new Date(request.creation_date).toLocaleTimeString();
        request.from = flipDateFormat(fixDate(new Date(request.from).toLocaleDateString()));
        request.till = flipDateFormat(fixDate(new Date(request.till).toLocaleDateString()));
    }
    return data;
}

function isDateCreatedLessThenAWeek(dayoffRequests) {
    var one_week = 7 * 24 * 60 * 60 * 1000;
    var date_of_today = new Date();
    dayoffRequests.forEach(function (request) {
        if (request.status == EVALUATING_STATUS_CODE) {
            var creation_date = new Date(request.creation_date);
            var difference = date_of_today - creation_date
            difference > one_week ? request.week_left = true : request.week_left = false
        }
    })

}

// Adds a zero when one is abscent.
function fixDate(date) {
    var fixDate = ''
    date.split('-').forEach(function (element) {
        if (element.length == 1) {
            element = '-0' + element
        }
        else if (element.length == 2) {
            element = '-' + element
        };
        fixDate = fixDate + element
    });
    return fixDate
}