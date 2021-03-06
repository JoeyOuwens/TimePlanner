﻿document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        $(function () {
            $('[data-toggle="popover"]').popover()
        })


        $(".accept-dayoff-request-btn").bind('click', function (e) {
            dayOffRequest(this.id, "APPROVED");
            changeTrToLoading(this.id, 'dayoff');
        });
        $(".deny-dayoff-request-btn").bind('click', function (e) {
            dayOffRequest(this.id, "DENIED");
            changeTrToLoading(this.id, 'dayoff');
        });

        $(".accept-change-request-btn").bind('click', function (e) {
            changeRequest(this.id, "APPROVED");
            changeTrToLoading(this.id, 'change');
        });
        $(".deny-change-request-btn").bind('click', function (e) {
            changeRequest(this.id, "DENIED");
            changeTrToLoading(this.id, 'change');
        });

        function getStatusComment(id, type) { 
            return $("#status-comment-" + type + "-" + id).val();
        };

        function changeTrToLoading(id,type){
                $('#'+type+'-request-'+id).html('<th colspan="10"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></th>');
                    
        }
         

        function dayOffRequest(id,status) {
            $.post("/approve/dayoffrequest", { id: id, status_comment: getStatusComment(id,"dayoff"), status: status }, function (result) {
                location.reload();
            });
        };  
        function changeRequest(id,status) {
            $.post("/approve/changerequest", { id: id, status_comment: getStatusComment(id, "change"), status: status }, function (result) {
                location.reload();
            });
        };

        

    }
}