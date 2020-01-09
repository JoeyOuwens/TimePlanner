const TimeTableItems = require('../models/timetable_item');

describe('Check for various functions in the timetable model', () => {
    it('Check if database has 3 seeds.', async () => {
        const TTIs = await TimeTableItems.query();
        console.log("TTIs is: " + TTIs.length);
        expect(TTIs.length).toBe(3);
    });

    it('Check username of first seed to be "Elon Musk".', async () => {
        const TTIs = await TimeTableItems.query().first().eager('user');
        expect(TTIs.user.getFullName()).toBe("Elon Musk");
    });

    it('Update comment of timetable id 2', async () => {
        const TTI = await TimeTableItems.query().patchAndFetchById(2, {
            comment: 'Na een gesprek gehad te hebben met hem zou hij dingen anders aanpakken. '
        });

        expect(TTI.comment).toBe('Na een gesprek gehad te hebben met hem zou hij dingen anders aanpakken. ');
    });
});