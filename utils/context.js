/**
 * Office Supplies: コンテキスト
 *
 * @module utils/context
 * @author Ippei SUZUKI
 */

// 環境変数を取得する。
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

/** 環境変数 */
exports.appEnv = appEnv;

/** Path */
exports.path = require('path');

/** Request */
exports.request = require('request');

/** Headers */
exports.headers = {
    "Content-Type": "application/json",
    "x-ibm-client-id": process.env.X_IBM_CLIENT_ID
};

/** List Catalog 最後の要素数 */
exports.LIST_CATALOG_LAST_NUMBER = 14;