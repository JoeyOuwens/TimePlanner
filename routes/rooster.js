'use strict';
var express = require('express');
var router = express.Router();
var add = require('./roostermanagement/add');
var edit = require('./roostermanagement/edit');
var index = require('./roostermanagement/index');

router.get('/', index.get);

router.get('/add-user', add.get);

router.post('/add-user', add.post);

router.get('/edit-user/:timetable_id', edit.get);
router.post('/edit-user/:timetable_id', edit.post);

module.exports = router;