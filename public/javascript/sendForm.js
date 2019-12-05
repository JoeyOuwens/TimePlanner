function validation() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === '' || email === '' || message === '') {
        alert("Please fill all fields...!");
        return false;
    } else if (!(email).match(emailReg)) {
        alert("Invalid Email...!");
        return false;
    } else {
        return true;
    }
}




function submit_by_id() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    if (validation()) {
        // document.getElementById("form").submit();
        alert(" Name : " + name + " \n Email : " + email + "\n Message " + message + "\n Form Id : " + document.getElementById("form_id").getAttribute("id") + "\n Form Submitted Successfully......");
    }
}
;
