const { Model } = require('objection');
const knex = require('../db/knex');
var crypto = require("crypto");

Model.knex(knex);

class Token extends Model {
    static get tableName() {
        return 'sick_days';
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

    static generateToken() {
        this.token_serial = crypto.randomBytes(15).toString('hex');
        return this.token_serial;
    }

    async useToken() {
        this.used = true;
        return this.$query().patch()
            .then(function () {
                return true;
            })
            .catch(function (e) {
                console.log(e);
                return false;
            });
    }

    isTokenExpired() {
        var today = new Date();
        if (today.getTime() > this.valid_until) 
            return true;
        return false;
    }
}

module.exports = Token;