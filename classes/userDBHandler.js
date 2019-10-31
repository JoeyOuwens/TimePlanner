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

    insertUser: function (accountDetails, password) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        return knex('users').insert([
            {
                password: password,
                firstname: accountDetails.inputFname,
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
                role: accountDetails.inputRights
            }]).then(function () {
                return true
            }).catch(function () {
                return false
            })  

    }
};