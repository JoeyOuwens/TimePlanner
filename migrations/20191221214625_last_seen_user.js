
exports.up = async function (knex) {
    await knex.schema.hasTable('users').then(async function (exists) {
        console.log(exists);
        if (exists) {
            await knex.schema.alterTable('users', t => {
                t.date("last_seen");
            });
        }
    })
    .catch(function (error) {
        console.error(error);
    });
};

exports.down = function (knex) {

};
