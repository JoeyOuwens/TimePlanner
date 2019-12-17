const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Availability extends Model {
    static get tableName() {
        return 'Availability';
    }

    getWeekDays() {
        return {
            monday: this.monday,
            tuesday: this.tuesday,
            wednesday: this.wednesday,
            thursday: this.thursday,
            friday: this.friday,
            saturday: this.saturday,
            sunday: this.sunday
        }
    }
}

module.exports = Availability;