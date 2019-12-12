var knex = require('../db/knex'); 

module.exports = {
    retreiveById: async function (userId) {
        return await checkIfUndefinedThenMapDefaultData(await retrieveAvailabilityById(userId));

    },

    update: async function (req) {
        await handleAvailabilityUpdate(req)
    },

    retreiveAll: async function () {
        return await getAllAvailabilities();
    }
}



function getDefaultData() {
    return { "monday": "", "tuesday": "", "wednesday": "", "thursday": "", "friday": "", "saturday": "", "sunday": "" }
}


function checkIfUndefinedThenMapDefaultData(availability) {
    if (availability == undefined) {
        return getDefaultData()
    }
    return availability;
}
async function retrieveAvailabilityById(userId) {
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
        .where({ userId: userId })
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
    var row = await knex.select("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday")
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
async function getAllAvailabilities() {
    var row = await knex.select("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "users.firstname", "users.middlename","users.lastname")
        .from("availability")  
        .join('users', { 'userId': 'users.id' })
        .then(function (data) { 
            return data
        }).catch(function (e) {
            console.log("e")
            return [];
        })
    return row;
}

async function rowExists(userId, day) {
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