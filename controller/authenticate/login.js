const knex = require('../../db/knex');

var login = async function (email, password) {

    console.log(email, password)
    if (await knex('users').where({ email: email }).where({ password: password }).first() !== undefined) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = login;