const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class RequestSubstitute extends Model {
    static get tableName() {
        return 'substitute';
    }
}

module.exports = RequestSubstitute;