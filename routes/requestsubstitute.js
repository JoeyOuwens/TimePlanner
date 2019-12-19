'use strict';
var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {
    res.render('requestsubstitute', { title: 'Vervanging'});
});





module.exports = router;

