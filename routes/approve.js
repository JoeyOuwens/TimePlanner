﻿'use strict';
var express = require('express');
var router = express.Router();
var dayoffRequestHandler = require('../classes/dayoffRequestHandler')
var validation = require('../classes/validation')


/*GET page */
router.get('/', async function (req, res) {
    if (isUserOwnerOrManager(req.session.user.role)) {
        var dayoffRequests = await dayoffRequestHandler.retreiveAll();
        changeDateToString(dayoffRequests);
        res.render('approve', { title: 'Goedkeuren', dayoffRequests: dayoffRequests });
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