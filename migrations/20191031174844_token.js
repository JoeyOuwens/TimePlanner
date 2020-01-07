/* Safe up */
exports.up = async function (knex) {
    await knex.schema.hasTable('token').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('token', t => {
                t.increments('id').primary;
                t.integer('user_id');
                t.string('token_serial');
                t.date('valid_until');
                t.boolean('used');
            });
        }
    })
    .catch(function (error) {
        console.error(error);
    });
};

/* Safe down */
exports.down = function (knex) {
    knex.schema.hasTable('token').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('token');
        }
    });
};
