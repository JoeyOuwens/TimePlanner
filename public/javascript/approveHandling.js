document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        $(function () {
            $('[data-toggle="popover"]').popover()
        })


        $(".accept-dayoff-request-btn").bind('click', function (e) {
            dayOffRequest(this.id,"APPROVED");
        });
        $(".deny-dayoff-request-btn").bind('click', function (e) {
            dayOffRequest(this.id,"DENIED");
        });

        $(".accept-change-request-btn").bind('click', function (e) {
            changeRequest(this.id,"APPROVED")
        });
        $(".deny-change-request-btn").bind('click', function (e) {
            changeRequest(this.id,"DENIED");
        });

        function getStatusComment(id,type) {
            return $("#status-comment-"+type+"-" + id).val()
        };



        function dayOffRequest(id,status) {
            $.post("/approve/dayoffrequest", { id: id, status_comment: getStatusComment(id,"dayoff"), status: status }, function (result) {
                location.reload();
            });
        };  
        function changeRequest(id,status) {
            $.post("/approve/changerequest", { id: id, status_comment: getStatusComment(id,"change"), status: status }, function (result) {
                location.reload();
            });
        };

        

    }
}