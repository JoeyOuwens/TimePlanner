
exports.up = async function(knex) {
    await knex.schema.hasTable('token').then(async function (exists) {
        console.log(exists);
        if (exists) {
            await knex.schema.alterTable('token', t => {
                t.foreign('user_id').references('id').inTable('users');
            });
        }
    });
};

exports.down = function(knex) {
  
};
