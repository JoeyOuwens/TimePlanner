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
                email: accountDetails.inputEmail,
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
                salary: 0.0,
                active: true
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