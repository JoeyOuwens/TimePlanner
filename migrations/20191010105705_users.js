/* Safe up */
exports.up = function (knex) {
    knex.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('users', t => {
                t.increments('id');
                t.string('password');
                t.string('firstname');
                t.string('lastname');
                t.string('email');
                t.date('employed_since');
                t.date('birth_date');
                t.string('address');
                t.string('zip');
                t.string('place');
                t.integer('contract_hours');
                t.boolean('firsttime');
                t.string('phone_number');
                t.string("function");
                t.string("role");
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
