/* Safe up */
exports.up = function (knex) {
    knex.schema.hasTable('sick_days').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('sick_days', t => {
                t.increments('id');
                t.integer('user_id').unsigned().index().references('id').inTable('users');
                t.date('date'); 
                t.string('reason'); 
                t.unique(['user_id', 'date']);   
                 
            }); 
        }
    });
};

/* Safe down */
exports.down = function (knex) {
    knex.schema.hasTable('sick_days').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('sick_days');
        }
    });
};
