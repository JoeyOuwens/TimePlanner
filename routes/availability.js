'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');
var Availability = require('../models/availability');  
var availabilityHandler = require('../classes/availabilityHandler');  

/* GET users listing. */
router.get('/', async function (req, res, next) {

    var availability = await Availability.query().where({ user_id: req.session.user.id }).first();

    if (availability === undefined) {
        availability = await Availability.query().insert({
            user_id: req.session.user.id
        });
    }

    var pageTitle = changePageTitleAccordingToContractHours(req, pageTitle);

    res.render('rooster/availability', { title: pageTitle, availability: availability !== undefined ? availability.getWeekDays() : undefined });
});

router.post('/', async function (req, res, next) {
    console.log(req.body);

    await availabilityHandler.update(req.session.user.id, req.body);

    res.redirect('/availability');
});

module.exports = router;

function changePageTitleAccordingToContractHours(req, pageTitle) {

    //Fulltime = vanaf 34 https://www.minimumloon.nl/fulltime-werken/
    if (req.session.user.contract_hours > 34) {
        pageTitle = "Voorkeuren";
    } else {
        pageTitle = "Beschikbaarheid"
    }
    return pageTitle
}