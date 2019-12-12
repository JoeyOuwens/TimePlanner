const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class SickDay extends Model {
    static get tableName() {
        return 'sick_days';
    }

    static get relationMappings() { 
        const User = require('./User'); 

        return {
            users: {
                relation: Model.BelongsToOneRelation, 
                modelClass: User,
                join: {
                    from: 'sick_days.userId',
                    to: 'users.id'
                }
            }
        }
    }
}


module.exports = SickDay;