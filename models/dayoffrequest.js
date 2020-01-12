const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class DayOffRequest extends Model {
    static get tableName() {
        return 'day_off_requests';
    }
}

module.exports = DayOffRequest;