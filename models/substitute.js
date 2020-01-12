const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class RequestSubstitute extends Model {
    static get tableName() {
        return 'substitute';
    }

    static get relationMappings() {
        const User = require('./User');
        const TimeTableItem = require('./timetable_item');

        return {
            requestingUser: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'substitute.requesting_user',
                    to: 'users.id'
                }
            },
            replacedByUser: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'substitute.replaced_by_user',
                    to: 'users.id'
                }
            },
            timetableItem: {
                relation: Model.BelongsToOneRelation,
                modelClass: TimeTableItem,
                join: {
                    from: 'substitute.timetable_item',
                    to: 'timetable_items.id'
                }
            }

        }
    }
} 

module.exports = RequestSubstitute;