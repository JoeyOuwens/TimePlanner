/* Safe up */
exports.up = async function (knex) {
    await knex.schema.hasTable('users').then(function (exists) {
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
                t.boolean("firsttime");
                t.unique('email');
            });
        }
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
