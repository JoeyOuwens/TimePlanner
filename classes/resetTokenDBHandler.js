var knex = require('../db/knex')

module.exports = {
    insertToken: function (tokenSerial, userId) {
        date = new Date() 
        date.setDate(date.getDate() + 1); 
        return knex('token').insert([
            {
                userId: userId,
                tokenSerial: tokenSerial,
                validUntil: date,
                used: false 
            }]).then(function () {
                return true
            }).catch(function (e) {
                console.log(e)
                return false
            })  
    },
    useToken: function (tokenSerial) {
       return knex('token')
            .where({ tokenSerial: tokenSerial })
            .update({ used: true })
            .then(function () { return true })
            .catch(function (e) {
                console.log(e)
                return false
            })  
    },

    getTokenByTokenSerial: async function(tokenSerial) { 
            var token = await knex.select()
                .from("token")
                .where("tokenSerial", tokenSerial)
                .then(function (data) {
                    return data
                }).catch(function () {
                    return [];
                })
        return token
    },

    getUserIdByTokenSerial: async function (tokenSerial) {
        var token = await knex.select("userId")
            .from("token")
            .where("tokenSerial", tokenSerial)
            .then(function (data) {
                return data
            }).catch(function () {
                return [];
            })
        return token
    },

    consoleLogTokens: async function () {
        var tokens = await knex.select()
            .from("token")
            .then(function (data) {
                return data
            }).catch(function () {
                return [];
            })
        console.log(tokens) 
    }
};
