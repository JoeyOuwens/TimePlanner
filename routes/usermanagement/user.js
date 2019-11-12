'use strict';
var express = require('express');
var router = express.Router();
var userDBHandler = require('../../classes/userDBHandler')


/* GET page. */
router.get('/delete/:id',  async function (req, res) {
    if (req.session.user.role == 'OWNER' || req.session.user.role == 'MANAGER') { 
        if (allowedToChange(req.session.user, req.params.id)){
            userDBHandler.deactivateUserById(req.params.id);
        }
    }
    res.redirect('/usermanagement/list');

});
router.get('/activate/:id', function (req, res) {
    if (allowedToChange(req.session.user, req.params.id)) {
        userDBHandler.activateUserById(req.params.id);
    }
    res.redirect('/usermanagement/list');

});


router.get('/edit/:id', async function (req, res) {
    if (await allowedToChange(req.session.user, req.params.id)) {
        var user = await userDBHandler.getUserById(req.params.id)
        res.render('usermanagement/edit', { title: 'Aanpassen', user: user[0] });
    } else {
        res.redirect('/usermanagement/list');
    }
});


router.post('/edit/:id', async function (req, res) {
    req.body.id = req.params.id
    console.log(req.body);
    userDBHandler.updateUser(req.body)
    res.redirect('/usermanagement/list');
});



module.exports = router;


async function allowedToChange(requestingUser, changingUserId) {
    var changingUser = await userDBHandler.getUserById(changingUserId)
    if ((requestingUser.role == 'MANAGER' && changingUser[0].role == "OWNER") || (requestingUser.role == 'MANAGER' && changingUser[0].role == "MANAGER") || (requestingUser.id == changingUser[0].id)) {
    return false
    } else {
        return true
    }
};