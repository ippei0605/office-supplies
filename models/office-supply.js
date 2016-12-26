/**
 * Office Supplies: モデル
 *
 * @module routes/index
 * @author Ippei SUZUKI
 */

// モジュールを読込む。
var context = require('../utils/context');

// API Connect を呼出す。
var apic = function (options, callback) {
    context.request(options, function (error, response, body) {
        if (error || response.statusCode != 200) {
            console.log('error: ' + JSON.stringify(error));
            console.log('response: ' + JSON.stringify(response));
            body = null;
        }
        callback(body);
    });
}


/** 事務用品をオーダーする。 */
exports.order = function (id, num, callback) {
    apic({
        "method": "POST",
        "url": " https://api.us.apiconnect.ibmcloud.com/jieckiban-demo/office/catalogMgr/orderItem",
        "headers": context.headers,
        "body": {
            "DFH0XCMNOperation": {"ca_order_request": {"ca_quantity_req": num, "ca_item_ref_number": id}}
        },
        "json": true
    }, function (body) {
        callback(body)
    });
};


/** 事務用品詳細を取得する。 */
exports.get = function (id, callback) {
    apic({
        "method": "GET",
        "url": "https://api.us.apiconnect.ibmcloud.com/jieckiban-demo/office/catalogMgr/getItemDetails/" + id,
        "headers": context.headers,
        "json": true
    }, function (body) {
        callback(body)
    });

};

// listCatalog のパラメータを返す。
var getListCatalogOptions = function (startItemID) {
    return {
        "method": "GET",
        "url": "https://api.us.apiconnect.ibmcloud.com/jieckiban-demo/office/catalogMgr/listCatalog?startItemID=" + startItemID,
        "headers": context.headers,
        "json": true
    };
}

// 全商品を取得する。
var listItems = function (startItemID, current, callback) {
    apic(getListCatalogOptions(startItemID), function (body) {
        var result = [].concat(current);
        if (body != null) {
            var request = body.DFH0XCMNOperationResponse.ca_inquire_request;
            var temp = request.ca_cat_item;
            var maxLength = 14;
            var max = maxLength;
            if (request.ca_item_count < maxLength) {
                max = request.ca_item_count;
            }
            for (var i = 0; i < max; i++) {
                result.push(temp[i]);
            }

            if (max == maxLength) {
                listItems(temp[max].ca_item_ref, result, function (result) {
                    callback(result);
                });
            } else {
                callback(result);
            }
        } else {
            callback(result);
        }
    });
};

/** 事務用品一覧を表示する。 */
exports.list = function (callback) {
    listItems('0', [], callback);
};