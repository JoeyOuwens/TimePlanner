'use strict';
var express = require('express');
var router = express.Router(); 
const Sickday = require('../models/sickday');




/*GET  page */
router.get('/', async function (req, res) {



    var alreadyCalledInSick = false;

    var sickday = await getTodaysSickDayByUserId(req.session.user.id);
    if (sickday.length > 0) {
        alreadyCalledInSick = true;


    } 


    res.render('call-in-sick', { title: 'Ziek melden', alreadyCalledInSick: alreadyCalledInSick });

});

router.post('/', async function (req, res) {
    console.log(req.body)
    if (req.body.callInSick) { 

        if (await getTodaysSickDayByUserId(req.session.user.id).length == 0) {  
            callInSick(req.session.user.id);
        }
    }
    res.render('call-in-sick', { title: 'Ziek melden' });
});


router.get('/list', async function (req, res) { 
    res.render('called-in-sick', { title: 'Ziek meldingen', sickdays: await getAllSickDays() });

});


function getDateOfToday() {

    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var day = new Date().getDate();

    var dateOfToday = new Date(year, month, day); 

    return dateOfToday;
}

async function callInSick(userId) {  
    await Sickday.query().insert({
        userId: userId,
        date: getDateOfToday()
    });
}

async function getAllSickDays() {
    const sickdays = await Sickday.query().select('sick_days.*', 'users.firstname as firstname', 'users.middlename as middlename', 'users.lastname as lastname')
        .join('users', 'users.id', 'sick_days.userId')
        .orderBy('date', 'DESC');
    return sickdays;

}

async function getTodaysSickDayByUserId(userId) { 

    const sickday = await Sickday.query()
        .select('id', 'date')
        .where('userId', userId)
        .where('date', getDateOfToday());

    return sickday;
}

module.exports = router;
