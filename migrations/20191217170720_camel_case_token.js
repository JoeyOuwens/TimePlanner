
exports.up = async function(knex) {
    await knex.schema.hasTable('token').then(async function (exists) {
        console.log(exists);
        if (exists) {
            await knex.schema.alterTable('token', t => {
                t.renameColumn('userId', 'user_id');
                t.renameColumn('tokenSerial', 'token_serial');
                t.renameColumn('validUntil', 'valid_until');
            });
        }
    });

};

exports.down = function(knex) {
  
};
