var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'password',
        database: 'time_planner'
    }
});

describe('Check database connection', () => {
    it('should test that there is a valid database to be connected to.', () => {
        var connection = true;
        knex.raw('select 1+1 as result').catch(err => {
            connection = false;
        });

        expect(connection).toBe(true);
    });
});