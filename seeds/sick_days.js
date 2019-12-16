
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('sick_days').del()
        .then(function () {
            // Inserts seed entries
            return knex('sick_days').insert([
                { id: 1, user_id: 3, date: new Date(2019,11,01)}, 
                { id: 2, user_id: 2, date: new Date(2019,05,05)}, 
                { id: 3, user_id: 3, date: new Date(2019,07,30)},
                { id: 4, user_id: 1, date: new Date(2019,07,21)}  
            ]);
        });
};
 ; 