
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('work_replacements').del()
    .then(function () {
      // Inserts seed entries
        return knex('work_replacements').insert([
            { id: 0, requesting_user: 1, replaced_by_user: 1, creation_datetime: new Date().setMonth(7),timetable_item: 3,  status: 'AWAITING_REPLACEMENT', comment: '' },
            { id: 1, requesting_user: 2, replaced_by_user: 3, creation_datetime: new Date().setMonth(5),timetable_item: 0,  status: 'AWAITING_APPROVAL', comment: '' },
            { id: 2, requesting_user: 3, replaced_by_user: 2, creation_datetime: new Date().setMonth(3),timetable_item: 1,  status: 'APPROVED', comment: '' },
            { id: 3, requesting_user: 2, replaced_by_user: 1, creation_datetime: new Date().setMonth(3),timetable_item: 2,  status: 'DENIED', comment: '' }
        ]);
    });
};
 

//STATUS CODES:
//______________________
//AWAITING_REPLACEMENT
//AWAITING_APPROVAL
//APPROVED
//DENIED

//DB Structure
//t.increments('id');
//t.integer('requesting_user').unsigned().index().references('id').inTable('users');
//t.integer('replaced_by_user').unsigned().index().references('id').inTable('users');
//t.datetime('creation_datetime');
//t.integer('timetable_item').unsigned().index().references('id').inTable('timetable_items');
//t.string('status');
//t.string('comment');