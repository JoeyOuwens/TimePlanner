const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Token extends Model {
    static get tableName() {
        return 'token';
    }
}

module.exports = Token;