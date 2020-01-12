const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class TimeTableItems extends Model {
    static get tableName() {
        return 'timetable_items';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./user"),
                join: {
                    from: 'timetable_items.user_id',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = TimeTableItems;