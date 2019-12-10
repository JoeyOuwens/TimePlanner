document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        $(function () {
            $('[data-toggle="popover"]').popover()
        })


        $(".accept-request-btn").bind('click', function (e) {
            acceptRequest(this.id);
        });
        $(".deny-request-btn").bind('click', function (e) {
            denyRequest(this.id);
        });


        function getStatusComment(id) {
            return $("#status-comment-" + id).val()
        };



        function acceptRequest(id) {
            $.post("/approve/dayoffrequest", { id: id, status_comment: getStatusComment(id), status: "APPROVED" }, function (result) {
                location.reload();
            });
        };

        function denyRequest(id) {
            $.post("/approve/dayoffrequest", { id: id, status_comment: getStatusComment(id), status: "DENIED" }, function (result) {
                location.reload();
            });
        };

    }
}