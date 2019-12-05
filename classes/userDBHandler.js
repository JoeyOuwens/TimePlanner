var knex = require('../db/knex')

module.exports = {
    getAllUsers: async function () {
        var users = await knex.select().from("users")
            .then(function (data) {
                return data
            }).catch(function () {
                return [];
            })
        return users
    },

    getUserById: async function (id) {
        var user = await knex.select()
            .from("users")
            .where("id", id)
            .then(function (data) {
                data[0].birth_date = fixDate(data[0].birth_date);
                data[0].employed_since = fixDate(data[0].employed_since);
                return data
            }).catch(function () {
                return [];
            })
        return user
    },
    getUserRoleById: async function (id) {
        var user = await knex.select("role")
            .from("users")
            .where("id", id)
            .then(function (data) {
                return data
            }).catch(function () {
                return [];
            })
        return user
    },
    getUserByEmail: async function (email) {
        var user = await knex.select()
            .from("users")
            .where("email", email)
            .then(function (data) {
                return data
            }).catch(function () {
                return [];
            })
        return user
    },
    getUserIdByEmail: async function (email) {
        var user = await knex.select("id")
            .from("users")
            .where("email", email)
            .then(function (data) {
                return data
            }).catch(function () {
                return [];
            })
        return user
    },
    insertUser: async function (accountDetails, password) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        return await knex('users').insert([
            {
                password: password,
                firstname: accountDetails.inputFname,
                middlename: accountDetails.inputMname,
                lastname: accountDetails.inputLname,
                email: accountDetails.inputEmail.toLowerCase(),
                employed_since: String(date),
                birth_date: accountDetails.inputDOB,
                address: accountDetails.inputAddress,
                zip: accountDetails.inputZipcode,
                place: accountDetails.inputPlace,
                contract_hours: accountDetails.inputWorkHours,
                phone_number: accountDetails.inputTelephone,
                function: accountDetails.inputFunction,
                role: accountDetails.inputRights,
                profile_image: '',
                salary: accountDetails.inputSalary,
                active: true,
                firsttime: true
            }]).then(function () {
                return true
            }).catch(function () { 
                return false
            })  

    },
    activateUserById: function (userId) {
        return knex('users')
            .where({ id: userId })
            .update({ active: true })
            .then(function () {
                return true
            })
            .catch(function (e) {
                console.log(e)
                return false
            })
    },


    deactivateUserById: function (userId) {
        return knex('users')
            .where({ id: userId })
            .update({ active: false })
            .then(function () {
                return true
            })
            .catch(function (e) {
                console.log(e)
                return false
            })
    },


    updateUser: async function (accountDetails) {
        var accountDetails = await mapValuesToUser(accountDetails)
        return knex('users')
            .where({ id: accountDetails.id })
            .update({
                password: accountDetails.password,
                firstname: accountDetails.firstname,
                middlename: accountDetails.middlename,
                lastname: accountDetails.lastname,
                email: accountDetails.email,
                employed_since: accountDetails.employed_since,
                birth_date: accountDetails.birth_date,
                address: accountDetails.address,
                zip: accountDetails.zip,
                place: accountDetails.place,
                contract_hours: accountDetails.contract_hours,
                phone_number: accountDetails.phone_number,
                function: accountDetails.function,
                role: accountDetails.role,
                profile_image: accountDetails.profile_image,
                salary: accountDetails.salary,
                active: accountDetails.active
            })
            .then(function () {
                return true
            })
            .catch(function (e) {
                console.log(e)
                return false
            })   

    },

    updateUserPasswordById: function (userId, password) {
        return knex('users')
            .where({ id: userId })
            .update({ password: password })
            .then(function () {
                return true
            })
            .catch(function (e) {
                console.log(e)
                return false
            })  
    }
};

function fixDate(date) {
    var fixDate = ''
    date.split('-').forEach(function (element) {
        if (element.length == 1){
            element = '-0' + element
        }
        else if (element.length == 2) {
            element = '-' + element
        } ;
        fixDate = fixDate + element 
    });
    
    return fixDate
};

//Checks if given accountDetails has values missing from initial user obj, then maps old ones to newer one if abscent.
async function  mapValuesToUser(accountDetails) {
    var user = await module.exports.getUserById(accountDetails.id); 
    for (var attributeName in user[0]) {
        if (accountDetails[attributeName] === undefined) {
            accountDetails[attributeName] = user[0][attributeName]
        }
    }
    return accountDetails
}; 