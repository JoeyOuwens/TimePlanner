'use strict';
var userDBHandler = require('../../classes/userDBHandler');

class Add {
    
    static async get(req, res, next) {
        if (req.session.user.role === 'USER')
            res.redirect('/rooster/');

        res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers() });
    }

    static async post(req, res, next) {
        if (req.session.user.role === 'USER')
            res.redirect('/rooster/');

        await knex('timetable_items').insert([
            {
                user: req.body.user,
                begin_date: req.body.begin_date,
                end_date: req.body.end_date,
                comment: req.body.comment
            }]);

        if (req.body.stay_on_page === 'on')
            res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers(), success: true });
        else
            res.redirect('/rooster/');
    }

}

module.exports = Add;