
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('sick_days').del()
        .then(function () {
            // Inserts seed entries
            return knex('sick_days').insert([
                { id: 1, user_id: 3, date: new Date(2019,11,01)}, 
                { id: 2, user_id: 2, date: new Date(2019,03,05)}, 
                { id: 3, user_id: 2, date: new Date(2019,05,05)}, 
                { id: 4, user_id: 3, date: new Date(2019,01,30)},
                { id: 5, user_id: 3, date: new Date(2019,07,30)},
                { id: 6, user_id: 1, date: new Date(2019,07,21),reason: "Ziek"},     
                { id: 7, user_id: 1, date: new Date(2019,09,21)},  
                { id: 8, user_id: 2, date: new Date(2019,02,21)},  
                { id: 9, user_id: 2, date: new Date(2019,11,21)},  
                { id: 10, user_id: 3, date: new Date(2019,04,11)},  
                { id: 11, user_id: 2, date: new Date(2019,01,24)},  
                { id: 12, user_id: 1, date: new Date(2019,04,11), reason: "Ziek"},  
                { id: 13, user_id: 1, date: new Date(2019,03,13)}  
            ]);
        });
};
 ; 