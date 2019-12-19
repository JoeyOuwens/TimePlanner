
exports.up = function (knex) {
    knex.schema.hasTable('substitute').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('substitute', t => {
                t.increments('id');
                t.integer('timetable_id').unsigned().index().references('id').inTable('timetable_items');
                t.datetime('begin_date');
                t.datetime('end_date');
                t.string('comment');
            });
        }
    });
  
};

exports.down = function (knex) {
    knex.schema.hasTable('substitute').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('substitute');
        }
    });
};
