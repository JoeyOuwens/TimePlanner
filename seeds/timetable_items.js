
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('timetable_items').del()
    .then(function () {
      // Inserts seed entries
        return knex('timetable_items').insert([
            { id: 1, user_id: 1, begin_date: new Date().toLocaleString(), end_date: new Date(new Date().setHours(new Date().getHours() + 2)).toLocaleString(), comment: 'Komt regelmatig te laat, let hier op. '},
            { id: 2, user_id: 2, begin_date: new Date().toLocaleString(), end_date: new Date(new Date().setHours(new Date().getHours() + 2)).toLocaleString(), comment: ''},
            { id: 3, user_id: 1, begin_date: new Date().toLocaleString(), end_date: new Date(new Date().setHours(new Date().getHours() + 2)).toLocaleString(), comment: ''} 
        ]);
    });
};
