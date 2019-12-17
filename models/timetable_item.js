const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class TimeTableItems extends Model {
    static get tableName() {
        return 'timetable_items';
    }
}

module.exports = TimeTableItems;