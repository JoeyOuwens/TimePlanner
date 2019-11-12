
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('timetable_items').del()
    .then(function () {
      // Inserts seed entries
        return knex('timetable_items').insert([
          { user: 1, begin_date: '2020-02-22 12:00:00', end_date: '2020-02-22 14:00:00', comment: 'Komt regelmatig te laat, let hier op. '},
          { user: 2, begin_date: '2020-02-22 12:00:00', end_date: '2020-02-22 14:00:00', comment: ''},
          { user: 1, begin_date: '2020-02-22 12:00:00', end_date: '2020-02-22 14:00:00', comment: ''} 
      ]);
    });
};
