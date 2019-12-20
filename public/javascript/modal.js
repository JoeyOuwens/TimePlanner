var page = 1;
var minPage = 1
var maxPage = 4
$("#helpBtn").click(function () {

    changeContext();
});
$("#next-btn").click(function () {
    if (page < maxPage) {
        page++;
    }
    changeContext();
});
$("#back-btn").click(function () {
    if (page > minPage) {
        page--;
    }
    changeContext();
});
function changeContext() {
    switch (page) {
        case 1:
            $("#back-btn").hide();
            $('#bodyText').html("<p>Bovenin  is de navigatie balk. Deze word gebruikt om vrij te vragen, vervanging te regelen, het profiel in te zien, of om de roosters te bekijken.</p> ");
            break;
        case 2:
            $("#back-btn").show();
            $('#bodyText').html("<p>Bij het klikken op home kom je op de homepage terecht, hier zie je je rooster voor aankomende week, notificaties, en de nieuwste medewerkers </p> ");
            break;
        case 3:
            $("#next-btn").show();
            $('#bodyText').html("<p>Tenslotte zie je naast het hint icoon ook en logout icoon, hiermee word je naar het inlogscherm gebracht.</p> ");
            break;
        case 4:
            $("#next-btn").hide();
            $('#bodyText').html("<p>Vanaf het inlogscherm kan je de Privacy Policy en de Terms of use lezen.Ook kan je hier je wachtwoord resetten en bericht sturen naar de developers</p>");
            break;

        default:
            page == 1;
            break;


    };

}