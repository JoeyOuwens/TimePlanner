

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        $("#submit_message").click(function () {
            var email, message, name;
            name = $('#contact-name').val();
            email = $('#contact-email').val();
            message = $('#contact-message').val();
            if (validation(name, email, message)) {
                $.post("contactpage", { name: name, email: email, message: message }, function (result) {
                    location.reload();
                });
                showMessage('success','Message sent'); 
            }  
        });
        function validation(name, email, message) {

            if (name === '' || email === '' || message === '') {
                showMessage("danger", "Please fill all fields...!");
                return false;
            } else if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
                showMessage("danger", "Invalid Email...!");
                return false;
            } else {
                return true;
            }
        }

        function showMessage(type,message) {
            $('#messagebox').html(`<div class= "alert alert-${type} alert-dismissible fade show" role = "alert"> ${message} <button type = "button" class= "close" data - dismiss="alert" aria - label="Close"> <i class= "fa fa-times"/> </button></div>`);
            

        }
    }
}
