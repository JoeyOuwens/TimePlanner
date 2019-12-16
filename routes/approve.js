﻿'use strict';
var express = require('express');
var router = express.Router();
var dayoffRequestHandler = require('../classes/dayoffRequestHandler')
var validation = require('../classes/validation')
var EVALUATING_STATUS_CODE = "In afwachting"

/*GET page */
router.get('/', async function (req, res) {
    if (isUserOwnerOrManager(req.session.user.role)) {
        var dayoffRequests = await getDayOffRequests();
        var changeRequests = await getChangeRequests();
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
        var changeRequests = await getChangeRequests();
        res.render('approve', { title: 'Goedkeuren', changeRequests: changeRequests, page: 'changeRequests' });
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
        console.log(req.body);
        res.redirect('/');
    }
}); 


async function  getDayOffRequests() {
    var dayoffRequests = await dayoffRequestHandler.retreiveAll();
    isDateCreatedLessThenAWeek(dayoffRequests);
    dayoffRequests.sort((a) => (a.week_left) ? -1 : 1).sort((a, b) => (a.creation_date < b.creation_date) ? -1 : 1).sort((a) => (a.status == EVALUATING_STATUS_CODE) ? -1 : 1)
    changeDateToString(dayoffRequests);
    //console.log(dayoffRequests)
    return dayoffRequests;
};

async function getChangeRequests() {
    var changeRequests = [
        {
            "id": "1",
            "requesting_user": { "id": 2, "fullname": "Elon Musk"},
            "replaced_by": { "id": 1, "fullname": "Gerard Ramsea" },
            "creation_datetime": "12-12-2019 10:04:41",
            "timetable_item": { "id": 0, "date": "13-12-2019", "time": "12:00 - 19:00" },
            "status": "In afwachting",
            "status_comment": ""
        },
        {
            "id": "2",
            "requesting_user": { "id": 2, "fullname": "Elon Musk" },
            "replaced_by": { "id": 1, "fullname": "Gerard Ramsea" },
            "creation_datetime": "12-04-2019 12:19:38",
            "timetable_item": { "id": 1, "date": "20-04-2019", "time": "13:00 - 21:00" },
            "status": "Goedgekeurd",
            "status_comment": ""
        },
        {
            "id": "31",
            "requesting_user": { "id": 2, "fullname": "Elon Musk" },
            "replaced_by": { "id": 1, "fullname": "Gerard Ramsea" },
            "creation_datetime": "12-04-2019 12:19:38",
            "timetable_item": { "id": 1, "date": "20-04-2019", "time": "13:00 - 21:00" },
            "status": "In afwachting",
            "status_comment": ""
        },
        {
            "id": 4,
            "requesting_user": { "id": 2, "fullname": "Elon Musk" },
            "replaced_by": { "id": 1, "fullname": "Gerard Ramsea" },
            "creation_datetime": "12-04-2019 12:19:38",
            "timetable_item": { "id": 1, "date": "20-04-2019", "time": "13:00 - 21:00" },
            "status": "In afwachting",
            "status_comment": ""
        }
    ]
    
    return changeRequests;
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