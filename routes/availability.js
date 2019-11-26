'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');
var knex = require('../db/knex');  

/* GET users listing. */
router.get('/', async function (req, res, next) {
     
    var availability = await retrieveAvailability(req.session.user.id) 
    availability = checkIfUndefinedThenMapDefaultData(availability)
    removeUnusedValues(availability)   

    var pageTitle = changePageTitleAccordingToContractHours(req, pageTitle);
    
    res.render('rooster/availability', { title: pageTitle, availability: availability });
});

router.post('/', async function (req, res, next) {
    console.log(req.body)

    await handleAvailabilityUpdate(req)

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

function getDefaultData() {
    return { "monday": "", "tuesday": "", "wednesday": "", "thursday": "", "friday": "", "saturday": "", "sunday": "" } 
}


function checkIfUndefinedThenMapDefaultData(availability){
    if (availability == undefined) {
        return getDefaultData()
    }
    return availability;
}
async function retrieveAvailability(userId) {
    return await getAvailability(userId).then(function (row) {
        return row[0]
    })
    .catch(function (e) {
        console.log(e)
        return [];
        }) 
}

function removeUnusedValues(availability) {
    if (availability.id != undefined) { 
        delete availability.id
    }
    if (availability.userId != undefined) {
        delete availability.userId 
    }
    
}

async function handleAvailabilityUpdate(req) {  
    var exists = await rowExists(req.session.user.id)
    if (exists) {
        console.log(req.body)
        await updateAvailability(req.session.user.id, req.body)
        
    } else {
        await insertAvailability(req.session.user.id, req.body)
    }  

    
}

async function updateAvailability(userId, info) {
    return knex('availability')
        .where({ userId: userId}) 
        .update({
            monday: info.monday,
            tuesday: info.tuesday,
            wednesday: info.wednesday,
            thursday: info.thursday,
            friday: info.friday,
            saturday: info.saturday,
            sunday: info.sunday
        })
        .then(function () {
            return true
        })
        .catch(function (e) {
            console.log(e)
            return false
        })   
}


async function getAvailability(userId) {
    var row = await knex.select()
        .from("availability")
        .where("userId", userId)
        .then(function (data) {
           
            return data
        }).catch(function (e) {
            console.log("e") 
            return [];
        })
    return row;
}


async function rowExists(userId,day) {
    var row = await getAvailability(userId, day);
    if (row.length > 0) {

        return true
    } else {

        return false
    }
}

async function insertAvailability(userId, info) {
    return await knex('availability').insert([
        {
            userId: userId,
            monday: info.monday,
            tuesday: info.tuesday,
            wednesday: info.wednesday,
            thursday: info.thursday,
            friday: info.friday,
            saturday: info.saturday,
            sunday: info.sunday

        }]).then(function () {
            return true
        }).catch(function (e) {
            console.log(e)

            return false
        })  
}