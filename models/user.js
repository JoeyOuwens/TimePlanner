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

    isManager() {
        if (this.role === 'MANAGER')
            return true;
        return false;
    }

    isOwner() {
        if (this.role === 'OWNER')
            return true;
        return false;
    }

    async activate() {
        this.active = true;
        return (await this.$query().patchAndFetch()).active;
    }

    async deactivate() {
        this.active = false;
        return (await this.$query().patchAndFetch()).active;
    }
}

module.exports = User;