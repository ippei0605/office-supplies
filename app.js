/**
 * @file Office Supplies アプリ
 * @author Ippei SUZUKI
 */

// モジュールを読込む。
var context = require('./utils/context');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var routes = require('./routes');

// アプリケーションを作成する。
var app = express();

// ミドルウェアを設定する。
app.set('views', context.path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(__dirname + '/public/favicon.ico'));

// ルートを設定する。
app.get('/', routes.index);
app.get('/item/:id', routes.get);
app.post('/item/order', routes.order);

// リクエトを受付ける。
app.listen(context.appEnv.port, '0.0.0.0', function () {
    console.log('server starting on ' + context.appEnv.url);
});