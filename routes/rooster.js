'use strict';
var express = require('express');
var router = express.Router();
var add = require('./roostermanagement/add');
var edit = require('./roostermanagement/edit');
var index = require('./roostermanagement/index');
var substitute = require('./roostermanagement/substitute');


router.get('/', index.get);

router.get('/add-user', add.get);

router.post('/add-user', add.post);

router.get('/edit-user/:timetable_id', edit.get);
router.post('/edit-user/:timetable_id', edit.post);

router.get('/substitute/list', substitute.get);
router.post('/substitute', substitute.post);
router.post('/substitute/take-over', substitute.takeOver);

module.exports = router;