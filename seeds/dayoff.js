
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('dayoffrequests').del()
        .then(function () {
            // Inserts seed entries
            return knex('dayoffrequests').insert([
                { userId: 1, creation_date: new Date('2019-01-20'), from: new Date('2019-06-20'), till: new Date('2019-07-10'), reason: 'Vakantie', status: 'APPROVED', status_comment: ''},
                { userId: 1, creation_date: new Date('2019-02-20'), from: new Date('2019-01-20'), till: new Date('2019-05-10'), reason: 'Privé', status: 'DENIED', status_comment: 'Niet voldoende personeel'},
                { userId: 1, creation_date: new Date('2019-03-30'), from: new Date('2019-12-20'), till: new Date('2019-12-30'), reason: 'Kerst', status: 'EVALUATING', status_comment: ''},
                { userId: 3, creation_date: new Date('2019-04-10'), from: new Date('2019-12-20'), till: new Date('2019-12-30'), reason: 'Kerst', status: 'EVALUATING', status_comment: ''},
                { userId: 1, creation_date: new Date('2019-11-28'), from: new Date('2019-12-20'), till: new Date('2019-12-30'), reason: 'Kerst', status: 'EVALUATING', status_comment: ''},
                { userId: 1, creation_date: new Date('2019-11-30'), from: new Date('2019-12-20'), till: new Date('2019-12-30'), reason: 'Kerst', status: 'EVALUATING', status_comment: ''},
 
            ]);
        });
};