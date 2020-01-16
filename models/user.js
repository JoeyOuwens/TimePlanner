const { Model } = require('objection');
const knex = require('../db/knex');
const hashText = require('pbkdf2-wrapper/hashText');
const verifyHash = require('pbkdf2-wrapper/verifyHash');
const TimeTableItems = require('./timetable_item');

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

    
    async get_week_scedule() {
        const week_day_name = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
        var begin_date = new Date();
        var end_date = new Date();
        let days = [];

        begin_date.setHours(0, 0, 0, 0);
        end_date.setDate(end_date.getDate() + 8);
        end_date.setHours(0, 0, 0, 0);
        /* Get the upcomming 7 days that the user is sceduled to work and add new values to the user model that contain their start and end hours/minutes and add it to the items variable */
        let items = await TimeTableItems.query()
            .where('user_id', this.id)
            .where('begin_date', '>=', begin_date.toISOString().replace('T', ' ').replace('Z', ''))
            .where('end_date', '<=', end_date.toISOString().replace('T', ' ').replace('Z', '')).then((values) => {
                values.forEach((item, index, array) => {
                    item.begin_time = new Date(item.begin_date).toTimeString().split(' ')[0].split(/(.+):/)[1];
                    item.end_time = new Date(item.end_date).toTimeString().split(' ')[0].split(/(.+):/)[1];
                    array[index] = item;
                });
                return values;
            });

        /* For loop for the upcomming 7 days that will be displayed on the dashboard */
        for (let i = 0; i < 7; i++) {
            /* Create today and tomorrow variables */
            var current_date = new Date();
            var next_date = new Date();

            /* Set correct dates for the variables*/
            current_date.setDate(current_date.getDate() + i);
            current_date.setHours(0, 0, 0, 0);
            next_date.setDate(next_date.getDate() + i + 1);
            next_date.setHours(0, 0, 0, 0);

            /* Add day X object to the days array with the name of the week */
            days[i] = { day_name: week_day_name[current_date.getDay()], day_count: i, day_items: [] };

            /* Loop through all timetable entries and check if their day is  */
            for (let j = 0; j < items.length; j++) {
                let item = items[j];
                if (Date.parse(item.begin_date) >= current_date.getTime() && Date.parse(item.begin_date) <= next_date.getTime()) {
                    days[i].day_items.push(item);
                }
            }
        }
        return days;
    }



    // TODO: Check if hashed password is the same as hashed&stored password. 
    async isPassword(password) {
        if (await verifyHash(password, this.password, config))
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
        this.password = await generateHashedPassword(password);
        return await this.$query().patchAndFetch();
    }

    static async generateHashedPassword(password) {
        return await hashText(password, config);
    }

}

module.exports = User;