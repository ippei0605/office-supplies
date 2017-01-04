/* Office Supplies アプリの JavaScript */
$(function () {
    $(document).ready(function () {
        // 数量を取得する。
        function getNumber() {
            return $('#numberId').val();
        }

        // 料金を計算する。
        function getPrice() {
            return $('#costId').text() * getNumber();
        }

        function loadingView(flag) {
            $('#loading-view').remove();
            if (!flag) return;
            $('<div id="loading-view" />').appendTo('body');
        }

        $('[data-toggle="popover"]').popover();

        $('#orderModalId').on('show.bs.modal', function (event) {
            // 設定値を取得する。
            var relatedTarget = $(event.relatedTarget);
            var stock = relatedTarget.data('stock');
            var cost = relatedTarget.data('cost');
            var description = relatedTarget.data('description');
            var ref = relatedTarget.data('ref');

            // 設定値をセットする。
            $('#modalTitleId').text(description);
            $('#refId').val(ref);
            $('#itemImageId').attr("src", "/images/" + ref + '.png');
            $('#costId').text(cost);
            $('#stockId').text(stock);
            $('#numberId').attr({
                'max': stock > 999 ? 999 : stock,
                'min': 1,
                'value': 1
            });
            $('#priceId').text(getPrice());
        });

        $('#numberId').keyup(function () {
            $('#priceId').text(getPrice());
        });

        $('#orderId').on('click', function () {
            loadingView(true);
            var resultModalMessageId = $('#resultModalMessageId');
            resultModalMessageId.attr('class', 'text-danger');
            $.ajax({
                type: "POST",
                url: "/item/order",
                data: {
                    "id": $('#refId').val(),
                    "number": getNumber()
                }
            }).done(function (value) {
                var result = value.DFH0XCMNOperationResponse;
                if (result.ca_return_code === 0) {
                    resultModalMessageId.attr('class', 'text-success');
                }
                resultModalMessageId.html(result.ca_response_message);
            }).fail(function (value) {
                resultModalMessageId.html('通信エラーが発生しました。');
            }).always(function (value) {
                $('#resultModalId').modal();
                $('#orderModalId').modal('hide');
                loadingView(false);
            });
        });

        $('#okId').on('click', function () {
            location.reload();
        });
    });
});