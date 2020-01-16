var knex = require('../db/knex');
var Availability = require('../models/availability'); 

module.exports = {
    retreiveById: async function (userId) {
        return await getAvailability(userId);
    },

    update: async function (userId, week) {
        await handleAvailabilityUpdate(userId, week);
    },

    retreiveAll: async function () {
        return await Availability.query().eager('user');
    }
};
 
async function handleAvailabilityUpdate(userId, week) {
    if (await Availability.query().where({ user_id: userId }).first() !== undefined)
        await Availability.query().patch({
            monday: week.monday,
            tuesday: week.tuesday,
            wednesday: week.wednesday,
            thursday: week.thursday,
            friday: week.friday,
            saturday: week.saturday,
            sunday: week.sunday
        }).where({ user_id: userId });
    else
        await Availability.query().insert({
        monday: week.monday,
        tuesday: week.tuesday,
        wednesday: week.wednesday,
        thursday: week.thursday,
        friday: week.friday,
        saturday: week.saturday,
        sunday: week.sunday
    }).catch(function (e) {
        console.log(e);
    });

}
 

async function getAvailability(userId) {
    return await Availability.query().where({ user_id: userId }).first().then((available) => {
        if (available !== undefined)
            return available;
        return { "monday": "", "tuesday": "", "wednesday": "", "thursday": "", "friday": "", "saturday": "", "sunday": "" };
    });}
 