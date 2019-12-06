function Modal() {
    var modal = document.getElementById("myModal");
    var modal2 = document.getElementById("myModal2");
    var modal3 = document.getElementById("myModal3");
    var button = document.getElementById("question");
    var span = document.getElementsByClassName("close")[0];
    var next = document.getElementById("next");
    var next2 = document.getElementById("next2");
    // When the user clicks the button, open the modal
    button.onclick = function () {
        modal.style.display = "block";
    }
    //Next hint
    next.onclick = function () {
        modal2.style.display = "block";
    }
    //Next hint
    next2.onclick = function () {
        modal3.style.display = "block";
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
            modal2.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                modal2.style.display = "none";
            }
        }

}