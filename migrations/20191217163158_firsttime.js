
exports.up = function(knex) {
    knex.schema.hasTable('users').then(function (exists) {
        knex.schema.alterTable('users', (t) => {
            t.boolean('firsttime');
        });
  
    });
};

exports.down = function(knex) {
  
};
