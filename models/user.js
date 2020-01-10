const { Model } = require('objection');
const knex = require('../db/knex');
const hashText = require('pbkdf2-wrapper/hashText');
const verifyHash = require('pbkdf2-wrapper/verifyHash');

const config = {
    encoding: 'hex',
    digest: 'sha256',
    hashBytes: 32,
    saltBytes: 16,
    iterations: 372791
};

Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'users';
    }

    getFullName() {
        if (this.middlename !== undefined && this.middlename.replace(/\s+/g, '') !== '')
            return this.firstname + ' ' + this.middlename + ' ' + this.lastname;
        else
            return this.firstname + ' ' + this.lastname;
    }

    getImage() {
        if (this.profile_image === '') {
            return 'images/default_profileimage.jpg';
        }
        return this.profile_image;
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

    isUser() {
        if (this.role === 'USER')
            return true;
        return false;
    }

    // TODO: Check if hashed password is the same as hashed&stored password. 
    isPassword(password) {
        if (verifyHash(password, this.password, config))
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

    // TODO: Add hashing to password. 
    async changePassword(password) {
        this.password = await hashText(password, config);
        return await this.$query().patchAndFetch();
    }

}

module.exports = User;