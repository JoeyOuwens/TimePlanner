
exports.up = function(knex) {
    knex.schema.hasTable('work_replacements').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('work_replacements', t => {
                t.increments('id');
                t.integer('requesting_user').unsigned().index().references('id').inTable('users');
                t.integer('replaced_by_user').unsigned().index().references('id').inTable('users');
                t.datetime('creation_datetime');
                t.integer('timetable_item').unsigned().index().references('id').inTable('timetable_items'); 
                t.string('status');
                t.string('comment');
            });
        }
    });
};

exports.down = function (knex) {
    knex.schema.hasTable('work_replacements').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('work_replacements');
        }
    });
};
