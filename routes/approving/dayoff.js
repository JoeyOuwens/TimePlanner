'use strict';
var express = require('express');
var router = express.Router();
var dayoffRequestHandler = require('../classes/dayoffRequestHandler')
const WorkReplacement = require('../models/work_replacement');
const TimeTableItem = require('../models/timetable_item');
var validation = require('../classes/validation')
var EVALUATING_STATUS_CODE = "EVALUATING"
class DayOffRequests {
    static async get(req, res, next) {
        if (isUserOwnerOrManager(req.session.user.role)) {
            var dayoffRequests = await getDayOffRequests();
            res.render('approve', { title: 'Goedkeuren', dayoffRequests: dayoffRequests, page: 'dayoffRequests' });
        } else {
            res.redirect('/dashboard');
        }
    }

    static async post(req, res, next) {
        if (isUserOwnerOrManager(req.session.user.role)) {
            await dayoffRequestHandler.updateStatus(req.body);
            res.redirect('/');
        } 
    }


}
module.exports = DayOffRequests;


function isUserOwnerOrManager(role) {
    if (role == "OWNER" || role == "MANAGER") {
        return true;
    } else {
        return false;
    }
}


async function getDayOffRequests() {
    var dayoffRequests = await dayoffRequestHandler.retreiveAll();
    isDateCreatedLessThenAWeek(dayoffRequests);
    dayoffRequests.sort((a) => (a.week_left) ? -1 : 1).sort((a, b) => (a.creation_date < b.creation_date) ? -1 : 1).sort((a) => (a.status == EVALUATING_STATUS_CODE) ? -1 : 1)
    changeDateToString(dayoffRequests); 
    return dayoffRequests;
};


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