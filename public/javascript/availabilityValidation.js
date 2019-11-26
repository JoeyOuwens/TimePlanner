
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
 
        //$("#time").on("change paste keyup", function () {

        //});

        function myfunction(param) {
            //some code
        }
        $("#time").focusout(function () {
            var regex = new RegExp('^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$');
            if (regex.test($(this).val())) {

                $(this).removeClass("is-invalid");

            } else { 
                $(this).addClass("is-invalid");

            }
        });
    };
}