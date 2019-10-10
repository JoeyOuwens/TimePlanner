const knex = require('../db/knex');

describe('Check database connection', () => {
    it('Test that there is a valid database to be connected to.', () => {
        var connection = true;
        knex.raw('select 1+1 as result').catch(err => {
            connection = false;
        });

        expect(connection).toBe(true);
    });
});