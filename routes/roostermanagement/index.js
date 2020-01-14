'use strict';
var TimeTableItems = require('../../models/timetable_item');
var Users = require('../../models/user');
var SickDays = require('../../models/sickday');
var Substitute = require('../../models/substitute');
var SICK_COLOR = "#d11141";
var TAKEN_OVER_COLOR = "#00b159";
var REQUESTING_SUBSTITUTE_COLOR = "#ffc425";
var DEFAULT_COLOR = "#00aedb"; 

// TO-DO IMPROVE PERFORMANCE / ? Caching??

class Index {
    static async get(req, res, next) { 
        var resource_list = await getResourceList(); 
        res.render('rooster',
            {
                title: 'Rooster',
                resources: JSON.stringify(resource_list)
            });
    }


    static async updateTimeTable(req, res, next) {
        console.time("Update time");
        var begin_date = new Date(req.body.data.start);
        var end_date = new Date(req.body.data.end); 
        var timetable = await getTimeTableData(begin_date, end_date); 
        console.timeEnd("Update time");
        res.send(JSON.stringify(timetable));
    }

}

module.exports = Index;


async function getResourceList() {
    var resource_list = [];
    await Users.query().where("active", "=", true)
        .then((users) => {
            users.forEach((user) => {
                resource_list.push({
                    "id": user.id,
                    "title": user.getFullName()
                })
            })
        });
    return resource_list;
}

async function getTimeTableData(begin_date, end_date) {
    var timetable_list = [];
    await TimeTableItems.query().eager('user')
        .where('begin_date', '>=', begin_date.toISOString().replace('T', ' ').replace('Z', ''))
        .where('end_date', '<=', end_date.toISOString().replace('T', ' ').replace('Z', ''))
        .then(async (items) => { 

            for (let item of items) {

                timetable_list.push(
                    {
                        "title": createEventTitle(item),
                        "start": item.begin_date,
                        "end": item.end_date,
                        "id": item.id,
                        "resourceId": item.user.id,
                        "comment": item.comment,
                        "user_id": item.user.id, 
                        "color": await getCorrectColor(item)
                    });
            };
        });
    return timetable_list;
}


async function getCorrectColor(item) {
    let substitute = await Substitute.query().where("timetable_item", "=", item.id).first().then((data) => { return data }).catch((e) => { console.log(e) });

    var isSick = await isUserSick(item);


    if (substitute !== undefined) {
        var isTakenOver = isRequestTakenOver(substitute);
        var isAwaitingSubstitute = isRequestAwaitingSubstitute(substitute);
    }

    if (isSick) {
        return SICK_COLOR;
    } else if (isTakenOver) {
        return TAKEN_OVER_COLOR;
    } else if (isAwaitingSubstitute) {
        return REQUESTING_SUBSTITUTE_COLOR;
    } else {
        return DEFAULT_COLOR;
    }
}

function createEventTitle(item) {
    //Creates a title with HH:MM - HH:MM
    return `${new Date(item.begin_date).getHours()}:${String(new Date(item.begin_date).getMinutes()).length == 1 ? "0" + String(new Date(item.begin_date).getMinutes()) : String(new Date(item.begin_date).getMinutes())} - ${new Date(item.end_date).getHours()}:${String(new Date(item.end_date).getMinutes()).length == 1 ? "0" + String(new Date(item.end_date).getMinutes()) : String(new Date(item.end_date).getMinutes())}`;


}

async function isUserSick(item) {
    let isSick = false;

    const today = new Date(item.begin_date);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(item.begin_date);
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    var sickDay = await SickDays.query().where("user_id", "=", item.user.id).andWhere("date", ">=", today.getTime()).andWhere("date", "<=", tomorrow.getTime()).first();
    //console.log(sickDay);
    if (sickDay !== undefined) {
        isSick = true;
    }
    //var sickDays = await SickDays.query().where("user_id", "=", item.user.id);

    //sickDays.forEach(function (sickDay) {
    //    if (sickDay.user_id == item.user.id && new Intl.DateTimeFormat('en-US').format(sickDay.date) == new Intl.DateTimeFormat('en-US').format(new Date(item.begin_date))) {
    //        isSick = true;
    //        return true;
    //    }
    //});
    return isSick;
}


function isRequestAwaitingSubstitute(substitute) {
    if (substitute.status == "AWAITING_REPLACEMENT") {
        return true;
    } else {
        return false;
    }
}


function isRequestTakenOver(substitute) {
    if (substitute.status == "APPROVED") {
        return true;
    } else {
        return false;
    }
}