const knex = require('../../db/knex');

var login = async function (email, password) {
    if (await knex('users').where({ email: email }).where({ password: password }).where({active: true}).first() !== undefined) {
        return true;
    }
    else {
        return false;
    }

};

module.exports = login;