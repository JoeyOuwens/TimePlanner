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

//function getDefaultData() {
//    return { "monday": "", "tuesday": "", "wednesday": "", "thursday": "", "friday": "", "saturday": "", "sunday": "" }
//}

//function checkIfUndefinedThenMapDefaultData(availability) {
//    if (availability == undefined) {
//        return getDefaultData()
//    }
//    return availability;
//}

//async function retrieveAvailabilityById(userId) {
//    return await getAvailability(userId).then(function (row) {
//        return row[0]
//    })
//        .catch(function (e) {
//            console.log(e)
//            return [];
//        })
//}

//function removeUnusedValues(availability) {
//    if (availability.id != undefined) {
//        delete availability.id
//    }
//    if (availability.userId != undefined) {
//        delete availability.userId
//    }
//}

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

//async function updateAvailability(userId, info) {
//    return knex('availability')
//        .where({ user_id: userId })
//        .update({
//            monday: info.monday,
//            tuesday: info.tuesday,
//            wednesday: info.wednesday,
//            thursday: info.thursday,
//            friday: info.friday,
//            saturday: info.saturday,
//            sunday: info.sunday
//        })
//        .then(function () {
//            return true
//        })
//        .catch(function (e) {
//            console.log(e)
//            return false
//        })
//}


async function getAvailability(userId) {
    return await Availability.query().where({ user_id: userId }).first().then((available) => {
        if (available !== undefined)
            return available;
        return { "monday": "", "tuesday": "", "wednesday": "", "thursday": "", "friday": "", "saturday": "", "sunday": "" };
    });}

//async function getAllAvailabilities() {
//    var row = await knex.select("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "users.firstname", "users.middlename","users.lastname")
//        .from("availability")  
//        .join('users', { 'user_id': 'users.id' })
//        .then(function (data) { 
//            return data
//        }).catch(function (e) {
//            console.log("e")
//            return [];
//        })
//    return row;
//}

//async function rowExists(userId) {
//    var row = await getAvailability(userId);
//    if (row.length > 0) {
//        return true
//    } else {
//        return false
//    }
//}

//async function insertAvailability(userId, info) {
//    return await knex('availability').insert([
//        {
//            user_id: userId,
//            monday: info.monday,
//            tuesday: info.tuesday,
//            wednesday: info.wednesday,
//            thursday: info.thursday,
//            friday: info.friday,
//            saturday: info.saturday,
//            sunday: info.sunday
//        }]).then(function () {
//            return true
//        }).catch(function (e) {
//            console.log(e)
//            return false
//        })
//}