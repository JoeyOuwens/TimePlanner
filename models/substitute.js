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
            requesting_user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'substitute.requesting_user',
                    to: 'users.id'
                }
            },
            replaced_by_user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'substitute.replaced_by_user',
                    to: 'users.id'
                }
            },
            timetable_item: {
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
}

module.exports = RequestSubstitute;