/* Safe up */
exports.up = async function (knex) {
    await knex.schema.hasTable('users').then(function (exists) {
        knex.schema.alterTable('users', (t) => {
            t.unique('email');
            t.string('middlename');
            t.decimal('salary');
            t.string('profile_image');
            t.boolean('active');
        });
    })
    .catch(function (error) {
        console.error(error);
    });
};

/* Safe down */
exports.down = function (knex) {
    knex.schema.hasTable('users').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('users');
        }
    });
};
