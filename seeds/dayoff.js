
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('day_off_requests').del()
        .then(function () {
            // Inserts seed entries
            return knex('day_off_requests').insert([
                { user_id: 1, creation_date: new Date('2019-01-20'), from: new Date('2019-06-20'), till: new Date('2019-07-10'), reason: 'Vakantie', status: 'APPROVED', status_comment: ''},
                { user_id: 1, creation_date: new Date('2019-02-20'), from: new Date('2019-01-20'), till: new Date('2019-05-10'), reason: 'Privé', status: 'DENIED', status_comment: 'Mensen te kort'},
                { user_id: 1, creation_date: new Date('2019-03-30'), from: new Date('2019-12-20'), till: new Date('2019-12-30'), reason: 'Kerst', status: 'EVALUATING', status_comment: ''},
                { user_id: 3, creation_date: new Date('2019-04-10'), from: new Date('2019-12-20'), till: new Date('2019-12-30'), reason: 'Kerst', status: 'EVALUATING', status_comment: ''},
                { user_id: 1, creation_date: new Date('2019-11-28'), from: new Date('2019-12-20'), till: new Date('2019-12-30'), reason: 'Kerst', status: 'EVALUATING', status_comment: ''},
                { user_id: 1, creation_date: new Date('2019-11-30'), from: new Date('2019-12-20'), till: new Date('2019-12-30'), reason: 'Kerst', status: 'EVALUATING', status_comment: ''},
 
            ]);
        });
};