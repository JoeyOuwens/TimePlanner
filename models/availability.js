const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Availability extends Model {
    static get tableName() {
        return 'Availability';
    }
}

module.exports = Availability;