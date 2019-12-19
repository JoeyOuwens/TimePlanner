const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class WorkReplacement extends Model {
    static get tableName() {
        return 'work_replacements';
    }
  

    static get relationMappings() {
        const User = require('./User');
        const TimeTableItem = require('./timetable_item');

        return {
            requestingUser: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'work_replacements.requesting_user',
                    to: 'users.id'
                }
            },
            replacedByUser: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'work_replacements.replaced_by_user',
                    to: 'users.id'
                }
            },
            timeTableItem: {
                relation: Model.BelongsToOneRelation,
                modelClass: TimeTableItem,
                join: {
                    from: 'work_replacements.timetable_item',
                    to: 'timetable_items.id'
                }
            }

        }
    }
}

module.exports = WorkReplacement;