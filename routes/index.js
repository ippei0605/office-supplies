/**
 * Office Supplies: ルーティング
 *
 * @module routes/index
 * @author Ippei SUZUKI
 */

// モジュールを読込む。
var officeSupply = require('../models/office-supply');

/** 事務用品をオーダーする。 */
exports.order = function (req, res) {
    officeSupply.order(req.params.id, req.params.num, function (result) {
        res.send(JSON.stringify(result, undefined, 2));
    })
};

/** 事務用品詳細を表示する。 */
exports.get = function (req, res) {
    officeSupply.get(req.params.id, function (result) {
        res.send(JSON.stringify(result, undefined, 2));
    })
};

/** 事務用品一覧を表示する。 */
exports.index = function (req, res) {
    officeSupply.list(function (result) {
        res.render('index', {"result": result});
    })
};