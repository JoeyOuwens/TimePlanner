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


    #myModal.modal
        .modal - content
    span.close & times;
    p#popuptext Welkom bij TimePlanner, HET systeem om werktijden bij te houden
    p(class= "far fa-arrow-alt-circle-right" id = 'next')
    #myModal2.modal
        .modal - content
    span.close & times;
    p#popuptext.
    Bovenin  is de navigatie balk.Deze word gebruikt om vrij te vragen,
        vervanging te regelen, het profiel in te zien, of om de roosters te bekijken.
            p(class= "far fa-arrow-alt-circle-right" id = 'next2')
    #myModal3.modal
        .modal - content
    span.close & times;
    p#popuptext.
    Bij het klikken op home kom je op de homepage terecht,
        hier zie je je rooster voor aankomende week, notificaties, en de nieuwste medewerkers
    p(class= "far fa-arrow-alt-circle-right" id = 'next3')
    #myModal4.modal
        .modal - content
    span.close & times;
    p#popuptext.
    Tenslotte zie je naast het hint icoon ook en logout icoon, hiermee word je naar het inlogscherm gebracht.
    Vanaf het inlogscherm kan je de Privacy Policy en de Terms of use lezen.Ook kan je hier je wachtwoord resetten en
    bericht sturen naar de developers van deze applicatie
    p(class= "far fa-times-circle" id = 'next4')