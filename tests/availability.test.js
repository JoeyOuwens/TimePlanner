
const User = require('../models/user');
const Availability = require('../models/availability');
const AvailabilityHandler = require('../classes/availabilityHandler');

describe('Check user', () => {
    it('Check if availability for "Elon Musk" gets created', async () => {
        expect(await AvailabilityHandler.retreiveById(await User.query().first())).toBeTruthy();

        await Availability.query().insert(
            {
                user_id: await User.query().first(),
                monday: "08:00 - 22:00",
                tuesday: "08:00 - 22:00",
                wednesday: "08:00 - 22:00",
                thursday: "08:00 - 22:00",
                friday: "08:00 - 22:00",
                saturday: "08:00 - 22:00",
                sunday: ""

            });

        expect((await Availability.query().eager('user').first()).user.getFullName()).toBe("Elon Musk");
    });

});