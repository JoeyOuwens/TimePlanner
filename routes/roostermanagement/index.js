'use strict';
var TimeTableItems = require('../../models/timetable_item');
var SickDays = require('../../models/sickday');
//var Substitute = require('../../models/substitute');
var SICK_COLOR = "purple";
var TAKEN_OVER_COLOR = "green"; 
var REQUESTING_SUBSTITUTE_COLOR = "orange"; 
var DEFAULT_COLOR = "";
// ToDo color meegeven als hij overgenomen is.
class Index {
    static async get(req, res, next) {
        var sickDays = await SickDays.query().where("date", "=", getDateOfToday());
        let timetable_list = [];
        let resource_list = [];
        console.log(sickDays);
        await TimeTableItems.query().eager('user').then((items) => {
            items.forEach((item) => {
                resource_list.push(
                    {
                        "id": item.user.id,
                        "title": item.user.getFullName()
                    }); 

                timetable_list.push(
                    {
                        "title": createEventTitle(item),
                        "start": item.begin_date,
                        "end": item.end_date,
                        "id": item.id,
                        "resourceId": item.user.id,
                        "color": getCorrectColor(item)
                        
                    });
            });
        }); 
        res.render('rooster',
            {
                title: 'Rooster',
                timeTable: JSON.stringify(timetable_list),
                resources: JSON.stringify(resource_list)
            });
    }
}

module.exports = Index;

function getDateOfToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();

    var dateOfToday = new Date(year, month, day);

    return dateOfToday;
}

function createEventTitle(item) {
    //Creates a title with HH:MM - HH:MM
    return `${new Date(item.begin_date).getHours()}:${String(new Date(item.begin_date).getMinutes()).length == 1 ? "0" + String(new Date(item.begin_date).getMinutes()) : String(new Date(item.begin_date).getMinutes())} - ${new Date(item.end_date).getHours()}:${String(new Date(item.end_date).getMinutes()).length == 1 ? "0" + String(new Date(item.end_date).getMinutes()) : String(new Date(item.end_date).getMinutes())}`;


}

function isUserSick(users, sickDays) {

}

function substituteHandling() {


}

function isStillRequestingSubstitute() {


}

function isTakenOver() {



}