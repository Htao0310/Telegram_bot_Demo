//==================    YOU API TOKEN   ==========================

var API_TOKEN = "679319253:AAGm3cvZU_m5ZjEh1Qc0Uh1MoqVvCnzUido";
var url = "https://api.telegram.org/bot" + API_TOKEN;
var webAppUrl = "https://script.google.com/macros/s/AKfycbxS5x4Dcrnj250ALefdrx0Fos1Q6qTM0Gqu9B8iFlzr6sRSff4U/exec";
var Spreadsheet_id = "1XZ8RfP3otEq_UxSmGPY_aIpOZHJKGUsOjOUl-KORwgg";


//==================        main        ==========================

/*
---------------原始请求
function sendText(id,txet) {
 var response =UrlFetchApp.fetch(url+"/"+"sendMessage?chat_id="+id+"&text="+txet);
 Logger.log(response.getContentText());
}
*/


//进化版本
function sendText(data) {
    var response = UrlFetchApp.fetch(url + '/', data);
    Logger.log(response.getContentText());
}

function getMe() {
    var response = UrlFetchApp.fetch(url + "/getMe");
    Logger.log(response.getContentText());
}

function setWebhook() {
    var response = UrlFetchApp.fetch(url + "/setWebhook?url=" + webAppUrl);
    Logger.log(response.getContentText());
}

function getUpdates() {
    var response = UrlFetchApp.fetch(url + "/getUpdates");
    Logger.log(response.getContentText());
}

function doGet(e) {
    return HtmlService.createHtmlOutput("hello" + JSON.stringify(e));
}

function doPost(e) {

    var contents = JSON.parse(e.postData.contents);
    var text = contents.message.text;
    var id = contents.message.from.id;
    var name = contents.message.from.first_name;
    var date = new Date();


//==================   BOT 对应回答的话（自行修改    ==========================
//  var h = "hi,"+name+",欢迎来到ANT_BOT";
//
    var start = '<b>Hello,</b>  <strong color="orange">' + name + '</strong>' + '\n\
<b>欢迎使用ANT_BOT!!!</b>' + '\n\
<i>使用 /list - 获取所有指令</i>' + '\n\
<i>使用 /help - 获取帮助</i>' + '\n\
<a href="tg://user?id=612230220">联系本人</a>\
';
    var list = '还在修改中.....';

    var help = '暂时没有什么可以帮助你的.....';

//==================                ==========================
// sendText(id,"Hi,"+name);

//==================        判断request        ==========================
    if (text == '/start') {
        var payload = {
            'method': 'sendMessage',
            'chat_id': String(id),
            'text': start,
            'parse_mode': 'HTML'
        }
        var data = {
            "method": "post",
            "payload": payload
        }
        sendText(data);

    } else if (text == '/list') {
        var payload = {
            'method': 'sendMessage',
            'chat_id': String(id),
            'text': list,

        }
        var data = {
            "method": "post",
            "payload": payload
        }
        sendText(data);

    } else if (text == '/help') {
        var payload = {
            'method': 'sendMessage',
            'chat_id': String(id),
            'text': help,

        }
        var data = {
            "method": "post",
            "payload": payload
        }
        sendText(data);

    }

//==================        发送gmail邮件        ==========================

//GmailApp.sendEmail(Session.getEffectiveUser().getEmail(),"Telegram Bot Update", JSON.stringify(contents, null,4));

//==================        将数据保存到Sheet中去        ==========================
/*
* openById(Spreadsheet_id)：根据id打开对应的表格
* getSheetByName("接收数据")：根据具体的name值找到对应的表
*
* */
    SpreadsheetApp.openById(Spreadsheet_id).getSheetByName("接收数据").appendRow([date, id, name, text, contents]);


}


/*

contents

{
    "update_id": 534485049,
    "message": {
        "message_id": 273,
        "from": {
            "id": 612230220,
            "is_bot": false,
            "first_name": "Htao",
            "language_code": "zh-CN"
        },
        "chat": {
            "id": 612230220,
            "first_name": "Htao",
            "type": "private"
        },
        "date": 1532566009,
        "text": "你好"
    }
}


e
{
    "parameter": {},
    "contextPath": "",
    "contentLength": 227,
    "queryString": "",
    "parameters": {},
    "postData": {
        "type": "application/json",
        "length": 227,
        "contents": "{\"update_id\":534485044,\n\"message\":{\"message_id\":268,\"from\":{\"id\":612230220,\"is_bot\":false,\"first_name\":\"Htao\",\"language_code\":\"zh-CN\"},\"chat\":{\"id\":612230220,\"first_name\":\"Htao\",\"type\":\"private\"},\"date\":1532565562,\"text\":\"hi\"}}",
        "name": "postData"
    }
}
*/