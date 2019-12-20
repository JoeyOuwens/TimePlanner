
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('timetable_items').del()
    .then(function () {
      // Inserts seed entries
        return knex('timetable_items').insert([
            { id: 0, user: 1, begin_date: new Date(new Date().setHours(new Date().getHours() + 1)).toLocaleString(), end_date: new Date(new Date().setHours(new Date().getHours() + 7)).toLocaleString(), comment: 'Komt regelmatig te laat, let hier op. '},
            {id:1, user: 2, begin_date: new Date().toLocaleString(), end_date: new Date(new Date().setHours(new Date().getHours() + 2)).toLocaleString(), comment: ''},
            {id:2, user: 1, begin_date: new Date().toLocaleString(), end_date: new Date(new Date().setHours(new Date().getHours() + 2)).toLocaleString(), comment: ''}, 
            {id:3, user: 1, begin_date: new Date().toLocaleString(), end_date: new Date(new Date().setHours(new Date().getHours() + 2)).toLocaleString(), comment: ''} 
        ]);
    });
};
