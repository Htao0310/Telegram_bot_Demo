var API_Token = "you bot api token";
var url ="https://api.telegram.org/bot" + API_Token+"/";
var webAppUrl ="你程序部署的网络地址"
// var webAppUrl = "https://script.google.com/macros/s/AKfycbxS5x4Dcrnj250ALefdrx0Fos1Q6qTM0Gqu9B8iFlzr6sRSff4U/exec";

function doPost(e){
  var estringa = JSON.parse(e.postData.contents);
  var payload = identificar(estringa);
  var data = {
    "method": "post",
    "payload": payload
  }
  UrlFetchApp.fetch(url, data);
}

function identificar(e){
  if (e.message.text){
    var mensaje = {
      "method": "sendMessage",
      "chat_id": e.message.chat.id,
      "text": e.message.text,
    } 
  }
  else if (e.message.sticker){
    var mensaje = {
      "method": "sendSticker",
      "chat_id": e.message.chat.id,
      "sticker": e.message.sticker.file_id
    }
   }
  else if (e.message.photo){
    var array = e.message.photo;
    var text = array[1];
    var mensaje = {
      "method": "sendPhoto",
      "chat_id": e.message.chat.id,
      "photo": text.file_id
    }
   }
    else {
    var mensaje = {
      "method": "sendMessage",
      "chat_id": e.message.chat.id,
      "text": "Try other stuff"
    }
   }
  return mensaje
}