'use strict';
var express = require('express');
var router = express.Router(); 
const Sickday = require('../models/sickday');
const pageSize = 10;




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
            callInSick(req.session.user.id,req.body.reason);
             
        }
    }
    res.render('call-in-sick', { title: 'Ziek melden' });
});


router.get('/list', async function (req, res) {  
 
    var sickDays = await getAllSickDays(1);
    var maxPages = sickDays.total / pageSize;

    res.render('called-in-sick', { title: 'Ziek meldingen', sickdays: sickDays.results, page: 1, maxPages: Math.ceil(maxPages) });

});

router.get('/list/:page', async function (req, res) {
    var currentPage = req.params.page;
    var sickDays = await getAllSickDays(currentPage);
    var maxPages = sickDays.total / pageSize;

    if (/^[0-9]+/.test(currentPage)){
        currentPage = parseInt(currentPage);
    } else {
        currentPage = 1;
    }
    if (currentPage > maxPages) {
        currentPage = maxPages;
    }

    if (currentPage < 1) {
        currentPage = 1;
    } 
    res.render('called-in-sick', { title: 'Ziek meldingen', sickdays: sickDays.results, page: Math.ceil(currentPage), pageSize: pageSize, maxPages: Math.ceil(maxPages) });

});


function getDateOfToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate(); 

    var dateOfToday = new Date(year, month, day); 

    return dateOfToday;
}

async function callInSick(userId,reason) {  
    await Sickday.query().insert({
        user_id: userId,
        date: getDateOfToday(),
        reason: reason
    });
}

async function getAllSickDays(index) { 
    const sickDays = await Sickday.query()
        .page(index - 1, pageSize)
        .eager('user')
        .orderBy('date', 'DESC')
        .then(function (data) { return data; })
        .catch(function (e) { console.log(e) }); 
    return sickDays;

} 
async function getTodaysSickDayByUserId(userId) { 

    const sickday = await Sickday.query()
        .select('id', 'date')
        .where('user_id', userId)
        .where('date', getDateOfToday());

    return sickday;
} 
module.exports = router;
