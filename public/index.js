/* Office Supplies アプリの JavaScript */
$(function () {
    $(document).ready(function () {
        $('[data-toggle="popover"]').popover();

        // ダイアログに値をセットする。
        $('#modalId').on('show.bs.modal', function (event) {
            var relatedTarget = $(event.relatedTarget);
            $('#modalTitleId').text(relatedTarget.data('description'));
            $('#itemImageId').attr("src", "/images/" + relatedTarget.data('ref') + '.png');
            $('#costId').text(relatedTarget.data('cost'));
            $('#stockId').text(relatedTarget.data('stock'));
        });
    });
});