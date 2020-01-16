const knex = require('../db/knex');

const User = require('../models/User');

describe('Check user', () => {
    it('Check if user gets created', async () => {
        await User.query().insert({
                firstname: "Albert",
                lastname: "Hoefnagel",
                password: "MySecretPassWord",
                email: "09619@hr.nl",
                employed_since: "2019-10-10",
                birth_date: "1997-09-28",
                address: "Prof. Test Straat 12",
                zip: "1234 AB",
                place: "Rotterdam",
                contract_hours: 16,
                phone_number: "010-1234567",
                function: "Vaatwasser",
                role: "gebruiker"
            });

        const total = await User.query().where({ email: "09619@hr.nl" }).count('id as CNT');

        expect(total[0].CNT).toBe(1);
    });

    it('Edit typo in users emailaddress.', async () => {

        await User.query().where({ email: "09619@hr.nl" }).update({ email: "0961988@hr.nl"});

        const user = await User.query().where({ email: "0961988@hr.nl" }).first();

        expect(user.email).toBe("0961988@hr.nl");

    });

    it('get full name of the first user', async () => {
        const user = await User.query().first();

        expect(user.getFullName()).toBe("Elon Musk");
        return "test";
    });

    it('Deactivate first user', async () => {
        const user = await User.query().first();
        expect(await user.deactivate()).toBe(0);
    });

    it('Activate first user', async () => {
        const user = await User.query().first();
        expect(await user.activate()).toBe(1);
    });

    it('Check if password check works for users', async () => {
        const user = await User.query().first();
        expect(await user.isPassword('IHaveNoPassword')).toBe(true);
        expect(await user.isPassword('SomeOtherPassword')).toBe(false);
    });
});