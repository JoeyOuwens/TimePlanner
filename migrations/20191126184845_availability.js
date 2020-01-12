
exports.up = async function(knex) {
    await knex.schema.hasTable('availability').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('availability', t => {
                t.integer('user_id').unsigned().index().references('id').inTable('users');
                t.string('monday');
                t.string('tuesday');
                t.string('wednesday');
                t.string('thursday');
                t.string('friday');
                t.string('saturday'); 
                t.string('sunday'); 

                t.unique('user_id'); 
                t.primary('user_id');

            });
        }
    })
    .catch(function (error) {
        console.error(error);
    });
};

exports.down = function (knex) {
    knex.schema.hasTable('availability').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('availability');
        }
    });
};
