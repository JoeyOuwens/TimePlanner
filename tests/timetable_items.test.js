const TimeTableItems = require('../models/timetable_item');

describe('Check for various functions in the timetable model', () => {
    it('Check if database has 3 seeds.', async () => {
        const TTIs = await TimeTableItems.query();
        expect(TTIs.length).toBe(3);
    });
});