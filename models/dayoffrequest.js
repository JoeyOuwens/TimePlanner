const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class DayOffRequest extends Model {
    static get tableName() {
        return 'dayoffrequests';
    }
}

module.exports = DayOffRequest;