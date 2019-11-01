/* Safe up */
exports.up = function (knex) {
    knex.schema.hasTable('token').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('token', t => {
                t.increments('id').primary;
                t.integer('userId');
                t.string('tokenSerial');
                t.date('validUntil');
                t.boolean('used');
            });
        }
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
