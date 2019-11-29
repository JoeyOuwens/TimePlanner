'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');
var knex = require('../db/knex');  
var availabilityHandler = require('../classes/availabilityHandler');  

/* GET users listing. */
router.get('/', async function (req, res, next) {
     
    var availability = await availabilityHandler.retreiveById(req.session.user.id)  
     

    var pageTitle = changePageTitleAccordingToContractHours(req, pageTitle);
    
    res.render('rooster/availability', { title: pageTitle, availability: availability });
});

router.post('/', async function (req, res, next) {
    console.log(req.body)

    await availabilityHandler.update(req)

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