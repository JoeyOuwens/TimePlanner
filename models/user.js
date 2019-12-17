const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'users';
    }

    getFullName() {
        console.log(this.middlename);
        if (this.middlename !== undefined && this.middlename.replace(/\s+/g, '') !== '')
            return this.firstname + ' ' + this.middlename + ' ' + this.lastname;
        else
            return this.firstname + ' ' + this.lastname;
    }
}

module.exports = User;