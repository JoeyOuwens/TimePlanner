const TimeTableItems = require('../models/timetable_item');

describe('Check for various functions in the timetable model', () => {
    it('Check if database has 3 seeds.', async () => {
        const TTIs = await TimeTableItems.query();
        console.log("TTIs is: " + TTIs.length);
        expect(TTIs.length).toBe(3);
    });

    it('Check username of first seed.', async () => {
        const TTIs = await TimeTableItems.query().first().eager('user');
        expect(TTIs.users.getFullName()).toBe("Elon Musk");
    });

});