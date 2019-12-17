const { Model } = require('objection');
const knex = require('../db/knex');
var crypto = require("crypto");

Model.knex(knex);

class Token extends Model {
    static get tableName() {
        return 'token';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./user"),
                join: {
                    from: 'token.user_id',
                    to: 'users.id'
                }
            }
        };
    }

    generateToken() {
        this.token_serial = crypto.randomBytes(15).toString('hex');
        return this.token_serial;
    }
}

module.exports = Token;