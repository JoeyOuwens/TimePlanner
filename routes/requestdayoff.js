﻿'use strict';
var express = require('express');
var router = express.Router();
var dayoffRequestHandler = require('../classes/dayoffRequestHandler')
var validation = require('../classes/validation')


/*GET page */
router.get('/', async function (req, res) {
    var dayoffRequests = await dayoffRequestHandler.retreiveByUserId(req.session.user.id);
    req.session.user.dayoffrequests = dayoffRequests;
    changeDateToString(dayoffRequests);
    res.render('requestdayoff', { title: 'Vrij vragen', dayoffRequests: dayoffRequests }); 
});

router.post('/', async function (req, res) { 
    var info = req.body;
    info.from = checkAndChangeDateFormat(info.from);
    info.till = checkAndChangeDateFormat(info.till);
    var failedFields = fieldValidation(info);
   

    var errorMessage = []
    if (failedFields.length == 0) {
        if (isBeginDateGreaterThanEndDate(info)) {
            errorMessage.push("Begin datum mag niet later zijn als de eind datum.");
        }
        if (isBeginDateLowerThenDateOfToday(info)) {
            errorMessage.push("Begin datum mag niet eerder zijn dan vandaag.")
        }
        if (errorMessage.length != 0) {

            res.render('requestdayoff', { title: 'Vrij vragen', dayoffRequests: req.session.user.dayoffrequests, fieldInput: req.body, error: errorMessage });

        } else {

            info.userId = req.session.user.id;
            if (await dayoffRequestHandler.insert(info)) {
                res.redirect('requestdayoff');
            } else {
                errorMessage.push("Er ging wat fout. Probeer later opnieuw.");
                res.render('requestdayoff', { title: 'Vrij vragen', dayoffRequests: req.session.user.dayoffrequests, fieldInput: req.body, error: errorMessage });  
            }
        }
    }
    else {
        errorMessage.push("Formaat van datum klopt niet. Het moet dd-mm-yyyy of yyyy-mm-dd zijn.");
        res.render('requestdayoff', { title: 'Vrij vragen', dayoffRequests: req.session.user.dayoffrequests, fieldInput: req.body, error: errorMessage }); 
    }
});


function flipDateFormat(date) {
    return date.split("-").reverse().join("-"); 
}


function checkAndChangeDateFormat(date){
    if (/^((0|1)\d{1})-((0|1|2)\d{1})-((19|20)\d{2})/.test(date)) {
        date = flipDateFormat(date); 
    }
    return date;
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


function isBeginDateLowerThenDateOfToday(info) {
    if (new Date(info.from).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
        return true
    } else {
        return false
    }
}

function isBeginDateGreaterThanEndDate(info) {
    if (new Date(info.from) > new Date(info.till)) {
        return true
    } else {
        return false
    }
}

function fieldValidation(details) {

    var failed = []; 
    if (!validation.date(details.from)) {
        failed.push("from");
    } 
    if (!validation.date(details.till)) {
        failed.push("till");
    } 
    return failed;

}



module.exports = router;