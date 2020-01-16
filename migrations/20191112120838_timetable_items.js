
exports.up = async function(knex) {
    await knex.schema.hasTable('timetable_items').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('timetable_items', t => {
                t.increments('id');
                t.integer('user_id').unsigned();
                t.datetime('begin_date');
                t.datetime('end_date');
                t.string('comment');
                t.foreign('user_id').references('id').inTable('users');
            });
        }
    })
    .catch(function (error) {
        console.error(error);
    });
};

exports.down = function(knex) {
    knex.schema.hasTable('timetable_items').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('timetable_items');
        }
    });
};
