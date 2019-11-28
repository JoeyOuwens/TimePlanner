
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('timetable_items').del()
    .then(function () {
      // Inserts seed entries
        return knex('timetable_items').insert([
            { user: 1, begin_date: new Date().toLocaleString(), end_date: new Date(new Date().setHours(new Date().getHours() + 2)).toLocaleString(), comment: 'Komt regelmatig te laat, let hier op. '},
            { user: 2, begin_date: new Date().toLocaleString(), end_date: new Date(new Date().setHours(new Date().getHours() + 2)).toLocaleString(), comment: ''},
            { user: 1, begin_date: new Date().toLocaleString(), end_date: new Date(new Date().setHours(new Date().getHours() + 2)).toLocaleString(), comment: ''} 
        ]);
    });
};
