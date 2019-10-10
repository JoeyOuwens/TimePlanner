const knex = require('../db/knex');

const User = require('../models/User');

describe('Check user', () => {
    it('Create a new user.', async () => {
        await knex('users').insert([
            {
                firstname: "Albert",
                lastname: "Hoefnagel",
                password: "MySecretPassWord",
                email: "0961988@hr.nl",
                employed_since: "2019-10-10",
                birth_date: "1997-09-28",
                address: "Prof. Test Straat 12",
                zip: "1234 AB",
                place: "Rotterdam",
                contract_hours: 16,
                phone_number: "010-1234567",
                function: "Vaatwasser",
                role: "gebruiker"
                
            }
        ]);

        //await knex('users').count('id as CNT').then(function (total) {
        //    console.log(total[0].CNT);
        //});


        const total = await knex('users').count('id as CNT');

        expect(total[0].CNT).toBe(1);
    });

    it('edit user x.', () => {


        expect(true).toBe(true);
    });

    it('fetch all users.', () => {


        expect(true).toBe(true);
    });

    it('delete all users.', async () => {
        await knex('users').del();

        const total = await knex('users').count('id as CNT');

        expect(total[0].CNT).toBe(0);
    });
});