/* Safe up */
exports.up = function (knex) {
    knex.schema.hasTable('users').then(function (exists) {
        knex.schema.alterTable('users', (t) => {
            t.unique('email');
        });

        knex.schema.alterTable('users', (t) => {
            t.string('middlename');
            t.decimal('salary');
            t.string('profile_image');
            t.boolean('active');
        });
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
