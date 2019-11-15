//https://formspree.io/forms/mknnvlgd/integration

var $ = require('jquery');

(function () {
    $(document).ready(function () {
        return $('#contact-form').submit(function (e) {
            var email, message, name;
            name = document.getElementById('inputName');
            email = document.getElementById('inputEmail');
            message = document.getElementById('inputMessage');
            if (!name.value || !email.value || !message.value) {
                alertify.error('Please check your entries');
                return false;
            } else {
                $.ajax({
                    method: 'POST',
                    url: '//https://formspree.io/mknnvlgd',
                    data: $('#contact-form').serialize(),
                    datatype: 'json'
                });

                e.preventDefault();
                $(this).get(0).reset();
                return alertify.success('Message sent');
            }
        });
    });

}).call(this);

//$(document).ready(function () {
//    $('#contact').submit(function (e) {
//        var name = document.getElementById('inputName'),
//            email = document.getElementById('inputEmail'),
//            message = document.getElementById('inputMessage');

//        if (!name.value || !email.value || !message.value) {
//            alertify.error('Please check your entries')
//        } else {
//            $.ajax({
//                url: "https://formspree.io/mknnvlgd",
//                method: "POST",
//                data: $('#contact').serialize(),
//                dataType: "json"
//            });
//            e.preventDefault()
//            $(this).get(0).reset()
//            alertify.succes('Message sent')
//        }

//    });
//});    