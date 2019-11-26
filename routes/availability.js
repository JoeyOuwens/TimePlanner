'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');
var knex = require('../db/knex');  

/* GET users listing. */
router.get('/', async function (req, res, next) {

    //Fulltime = vanaf 34 https://www.minimumloon.nl/fulltime-werken/ 
    if (req.session.user.contract_hours > 34) {
        var pageTitle = "Voorkeuren";
    } else {
        var pageTitle = "Beschikbaarheid"
    }
    var availability = await retrieveAvailability(req.session.user.id);
    console.log(availability)
    res.render('rooster/availability', { title: pageTitle, availability: availability });
});

router.post('/', async function (req, res, next) {
    console.log(req.body)

    await handleAvailabilityUpdate(req)

    res.redirect('/availability');
});

module.exports = router;

async function retrieveAvailability(userId) {
    var rows = await getAllAvailabilityRows(userId);
    if (rows > 0) { 
        return rows 
    } else { 
        return rows
    }
}

async function handleAvailabilityUpdate(req) {  

            var exists = await rowExists(req.session.user.id, key)
            if (exists) {
                console.log("update")
                await updateAvailability(req.session.user.id, key,req.body[key])

            } else {
                console.log("insert")
                await insertAvailability(req.session.user.id, key, req.body[key])
            
        }
    });
    
}

function isValidDay(possibleDay) {
    var daysInWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    var isValid = false;
    daysInWeek.forEach(function (day) {
        if (possibleDay == day) {
            console.log(day)
            isValid = true;
        }
    })
    return isValid;
}

async function updateAvailability(userId, day, info) {
    return knex('availability')
        .where({ userId: userId})
        .andWhere({ day: day })
        .update({
           info: info
        })
        .then(function () {
            return true
        })
        .catch(function (e) {
            console.log(e)
            return false
        })   
}

async function getAllAvailabilityRows(userId) {
    var row = await knex.select()
        .from("availability")
        .where("userId", userId) 
        .then(function (data) {
            return data
        }).catch(function (e) {
            console.log(e)
            return [];
        })
    return row;
}


async function getAvailabilityRow(userId, day) {
    var row = await knex.select("id")
        .from("availability")
        .where("userId", userId)
        .andWhere('day', day)
        .then(function (data) {
            console.log("row found")

            console.log(data)
            return data
        }).catch(function () {
            console.log("NODATA", day,userId) 
            return [];
        })
    return row;
}


async function rowExists(userId,day) {
    console.log("exist check")
    var row = await getAvailabilityRow(userId, day);
    if (row.length > 0) {

        console.log("exist true")
        return true
    } else {

        console.log("exist false")
        return false
    }
}

async function insertAvailability(userId, day, info) {
    return await knex('availability').insert([
        {
            userId: userId,
            day: day,
            info: info,

        }]).then(function () {
            console.log("inserted")
            return true
        }).catch(function (e) {
            console.log(e)

            return false
        })  
}