
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('sick_days').del()
        .then(function () {
            // Inserts seed entries
            return knex('sick_days').insert([
                { id: 1, userId: 3, date: new Date(2019,11,01)}, 
                { id: 2, userId: 2, date: new Date(2019,05,05)}, 
                { id: 3, userId: 3, date: new Date(2019,07,30)},
                { id: 4, userId: 1, date: new Date(2019,07,21)}  
            ]);
        });
};
 ; 