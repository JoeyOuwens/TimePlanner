/* Safe up */
exports.up = function (knex) {
    knex.schema.hasTable('dayoffrequests').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('dayoffrequests', t => {
                t.increments('id'); 
                t.integer('userId').unsigned().index().references('id').inTable('users');
                t.date('creation_date'); 
                t.date('from'); 
                t.date('till'); 
                t.string('reason'); 
                t.string('status'); 
                t.string('status_comment'); 
            }); 
        }  
    });
};

/* Safe down */
exports.down = function (knex) {
    knex.schema.hasTable('dayoffrequests').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('dayoffrequests');
        }
    });
};
