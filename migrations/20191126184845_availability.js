
exports.up = function(knex) {
    knex.schema.hasTable('availability').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('availability', t => {
                t.increments('id');
                t.integer('userId').unsigned().index().references('id').inTable('users');
                t.string('monday');
                t.string('tuesday');
                t.string('wednesday');
                t.string('thursday');
                t.string('friday');
                t.string('saturday'); 
                t.string('sunday'); 
                t.unique(['userId', 'day']); 

            });
        }
    });
};

exports.down = function (knex) {
    knex.schema.hasTable('availability').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('availability');
        }
    });
};
