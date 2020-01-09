/* Safe up */
exports.up = async function (knex) {
    knex.schema.hasTable('day_off_requests').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('day_off_requests', t => {
                t.increments('id'); 
                t.integer('user_id').unsigned().index().references('id').inTable('users');
                t.date('creation_date'); 
                t.date('from'); 
                t.date('till'); 
                t.string('reason'); 
                t.string('status'); 
                t.string('status_comment'); 
            }); 
        }  
    })
    .catch(function (error) {
        console.error(error);
    });
};

/* Safe down */
exports.down = function (knex) {
    knex.schema.hasTable('day_off_requests').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('day_off_requests');
        }
    });
};
