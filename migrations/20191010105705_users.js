/* Safe up */
exports.up = function (knex) {
    knex.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('users', t => {
                t.increments('id');
                t.string('password');
                t.string('firstname');
                t.string('middlename');
                t.string('lastname');
                t.string('email');
                t.date('employed_since');
                t.date('birth_date');
                t.string('address');
                t.string('zip');
                t.string('place');
                t.integer('contract_hours');
                t.decimal('salary');
                t.string('phone_number');
                t.string("function");
                t.string("role");
                t.string("profile_image");
                t.boolean("active");
                t.unique('email');
            });
        }
        if (exists) {
            return knex.schema.alterTable('users', t => {
                t.string('middlename');
                t.decimal('salary');
                t.string('profile_image');
                t.boolean('active');
                t.unique('email');
            });
        }
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
