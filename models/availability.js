const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Availability extends Model {
    static get tableName() {
        return 'availability';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./user"),
                join: {
                    from: 'availability.user_id',
                    to: 'users.id'
                }
            }
        };
    }

    getWeekDays() {
        return {
            monday: this.monday ? this.monday : "",
            tuesday: this.tuesday ? this.tuesday : "",
            wednesday: this.wednesday ? this.wednesday : "",
            thursday: this.thursday ? this.thursday : "",
            friday: this.friday ? this.friday : "",
            saturday: this.saturday ? this.saturday : "",
            sunday: this.sunday ? this.sunday : ""
        };
    }
}

module.exports = Availability;