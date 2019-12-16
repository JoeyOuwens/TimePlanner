'use strict';
var express = require('express');
var router = express.Router(); 
const Sickday = require('../models/sickday');




/*GET  page */
router.get('/', async function (req, res) {



    var alreadyCalledInSick = false;
    console.log(req.session.user)
    var sickday = await getTodaysSickDayByUserId(req.session.user.id);
    console.log(sickday)
    if (sickday.length > 0) {
        alreadyCalledInSick = true;

    } 


    res.render('call-in-sick', { title: 'Ziek melden', alreadyCalledInSick: alreadyCalledInSick });

});

router.post('/', async function (req, res) {
    console.log(req.body)
    if (req.body.callInSick) { 
         
        var today = await getTodaysSickDayByUserId(req.session.user.id); 

        if (today.length == 0) {  
            callInSick(req.session.user.id);
             
        }
    }
    res.render('call-in-sick', { title: 'Ziek melden' });
});


router.get('/list', async function (req, res) { 
    var sickdays = await getAllSickDays()
    console.log(sickdays)
    res.render('called-in-sick', { title: 'Ziek meldingen', sickdays:  sickdays });

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
        user_id: userId,
        date: getDateOfToday()
    });
}

async function getAllSickDays() { 
    const sickdays = await Sickday.query().eager('user').orderBy('date', 'DESC');
    return sickdays;

}

async function getTodaysSickDayByUserId(userId) { 

    const sickday = await Sickday.query()
        .select('id', 'date')
        .where('user_id', userId)
        .where('date', getDateOfToday());

    return sickday;
}

module.exports = router;
