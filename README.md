# Office Supplies  

## はじめに
「JIEC の API ソリューション」のデモアプリは次の3層構造になっています。  

1. On-premise RD&T zConnect
1. Bluemix API Connect
1. Bluemixフロントエンド

本アプリは3層中の一つである「Bluemix フロントエンド」です。

## 実行手順
### 前提条件
* 3層アプリが全て稼働していること。(基本的に常時稼働しています。)

### トップページにアクセスする
* 次のURLにアクセスしてください。(Amazon.co.jp に似たデザインのページが表示されます。)  
  https://jiec-prime.mybluemix.net/  
  ![トップページ](docs/top.png)  

### 注文する
* アイテムをクリックすると注文ダイアログが表示されます。  
  ![注文](docs/order.png)  
* 数量を入力して、注文ボタンをクリックしてください。次の結果が表示されます。(数量は1〜在庫数または999個まで)  
  ![注文](docs/result.png)  
* OKボタンをクリックしてください。トップページに戻ります。   

## Bluemix API Connect
本アプリから呼出している Bluemix API Connect 層のAPIを以下に示します。

|説明|Method|処理|
|一覧をリストするAPI|GET|https://api.us.apiconnect.ibmcloud.com/jieckiban-demo/office/catalogMgr/listCatalog?startItemID={開始商品番号}|
|商品詳細の照会API|GET|https://api.us.apiconnect.ibmcloud.com/jieckiban-demo/office/catalogMgr/getItemDetails/{商品番号}|
|オーダーAPI|POST|https://api.us.apiconnect.ibmcloud.com/jieckiban-demo/office/catalogMgr/orderItem
こちらは以下のBody(JSON形式)が必要です。

{"DFH0XCMNOperation": {"ca_order_request": {"ca_quantity_req": 注文個数,"ca_item_ref_number": 商品番号} }|


※３つのAPIとも、実行できるアプリケーションを特定しているので、ヘッダーにクライアントIDが必要です。

　x-ibm-client-id:082d49d4-215f-48e5-931e-fc70a26ada9a

※その他、ヘッダーにacceptとcontext-typeくらいは指定しておいた方がよいかも。

　accept: application/json
　content-type: application/json







## ファイル構成  
    office-supplies
    │  .cfignore
    │  .gitignore
    │  app.js                 アプリ
    │  package.json
    │  README.md
    │
    ├─docs
    │      order.png          README.md の図
    │      result.png         README.md の図
    │      top.png            README.md の図
    │
    ├─models
    │      office-supply.js   モデル
    │
    ├─public
    │      images/            画像ファイル
    │      favicon.ico
    │      index.js           クライアント JavaScript
    │      mybootstrap.css
    │      
    ├─routes
    │      index.js           ルーティング
    │      
    ├─utils
    │      context.js         コンテキスト
    │      
    └─views
           index.ejs          画面


## ルート (URLマッピング)
|Action|Method|処理|
|---|-----------|-----------|
|/|GET|事務用品一覧ページを表示する。|
|/item/:id|GET|事務用品詳細を取得して結果(JSON)を返す。|
|/item/order|POST|事務用品をオーダーして結果(JSON)を返す。{id, number}|


## 参考文献
* z/OS Connect Enterprise Edition V2.0  
  https://www-03.ibm.com/support/techdocs/atsmastr.nsf/WebIndex/WP102604  
  - [Getting Started Guide](https://www-03.ibm.com/support/techdocs/atsmastr.nsf/5cb5ed706d254a8186256c71006d2e0a/ef7025c4a674ca4a86257f0d00725591/$FILE/WP102604%20-%20zOS%20Connect%20EE%20V2%20Getting%20Started.002.pdf/WP102604%20-%20zOS%20Connect%20EE%20V2%20Getting%20Started.pdf)
* IBM デモサイト  
  https://officesupplies.mybluemix.net/  
  (JeanLeclerc/jean)  