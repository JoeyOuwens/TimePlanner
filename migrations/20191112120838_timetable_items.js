
exports.up = function(knex) {
    knex.schema.hasTable('timetable_items').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('timetable_items', t => {
                t.increments('id');
                t.integer('user').unsigned().index().references('id').inTable('users');
                t.datetime('begin_date');
                t.datetime('end_date');
                t.string('comment');
            });
        }
    });
};

exports.down = function(knex) {
    knex.schema.hasTable('timetable_items').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('timetable_items');
        }
    });
};
