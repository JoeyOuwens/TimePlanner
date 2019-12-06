'use strict';
var userDBHandler = require('../../classes/userDBHandler');
var knex = require('../../db/knex');
var availabilityHandler = require('../../classes/availabilityHandler');  

class Add {
    
    static async get(req, res, next) {
        if (req.session.user.role === 'USER')
            res.redirect('/rooster/');
         
        res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers(), availability: await availabilityHandler.retreiveAll() });
    }

    static async post(req, res, next) {
        if (req.session.user.role === 'USER')
            res.redirect('/rooster/');

        if (req.body.begin_date >= req.body.end_date) {
            res.render('rooster/add-user', { title: "Gebruiker inroosteren", user_list: await userDBHandler.getAllUsers(), availability: await availabilityHandler.retreiveAll(), user: req.body, error: "Begintijd mag niet later zijn dan eindtijd", success: false });
            return;
        }

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