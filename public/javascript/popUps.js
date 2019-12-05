var express = require('express');
var knexjs = require('../db/knex');
var router = express.Router();
var $ = require('jquery');

function popup() {
    $(window).load(function () {
        $(".trigger_popup_fricc").click(function () {
            $('.hover_bkgr_fricc').show();
        });
        $('.hover_bkgr_fricc').click(function () {
            $('.hover_bkgr_fricc').hide();
        });
        $('.popupCloseButton').click(function () {
            $('.hover_bkgr_fricc').hide();
        });
    });
}