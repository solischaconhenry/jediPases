var pasesService = require('../businessLogic/pasesService.js'),
path = require('path'),
fs = require('fs'),
http =  require('https'),
request = require('request'),
boardHC = process.env.boardHC,
boardWS = process.env.boardWS;
const TOKEN10 = process.env.TOKEN10;


exports.general = function(eRequest, eResponse) {


  if(eRequest.body.type === 'url_verification'){
    pasesService.challenge(eRequest.body, function(data){
      eResponse.send(data);  
    });
  }
  console.log(eRequest.body);
  

  //en caso de app_mnention o slash command
  //if(eRequest.body.event.type != undefined && eRequest.body.event.type === 'app_mention'){
    //extrae con un split "text": "<@channel> getWSV" el mensaje adjunto con el mention
  //var reqTxtType = eRequest.body.event.text.split(' ',2)[1];
  //}
  if(eRequest.body.command === '/board'){
    //extrae el texto del comando para seleccionar el board
  var reqTxtType = eRequest.body.text;

  }//fin if type

  

  switch(reqTxtType){
    case 'getHCV':
      //pedir trello
    pasesService.getPasesHC(boardHC, function(res){
       
       //seteo para enviar a slack
       var attachments = [{
                    fallback: 'Más Información - https://trello.com/b/9UyXF5Fc/releasehcenter',
                    text: '<https://trello.com/b/9UyXF5Fc/releasehcenter> - Más Información',
                    color: "#F35A00",
                    author_name: "#TEAM-JEDI",
                    footer: "pasesBac",
                    fields: res
            }]//fin attachments
       var options = { method: 'POST',
       url: 'https://slack.com/api/chat.postMessage',
       form: 
       {    //channel: eRequest.body.event.channel = undefined ?  eRequest.body.channel_name : '',
            channel: eRequest.body.channel_name,
            text: 'Versiones de HCenter',
            attachments: JSON.stringify(attachments)
        },
        headers: {
         'Content-Type': 'application/json',
         'Authorization' : `Bearer ${TOKEN10}`
      }
    };//fin options

    //envio a slack
    pasesService.requestGeneral(options, function(res){
      eResponse.status(200).json(res);
    });//fin requestGeneral

  });//fin getPasesHC

  break;

  case 'getWSV':
   pasesService.getPasesHC(boardWS, function(res){
      
      //seteo para enviar a slack
       var attachments = [{
                    fallback: 'Más Información - https://trello.com/b/Z40ipANn/releasewebservice',
                    text: '<https://trello.com/b/Z40ipANn/releasewebservice> - Más Información',
                    color: "#FF9900",
                    author_name: "#TEAM-JEDI",
                    footer: "pasesBac",
                    fields: res
            }]//fin attachments
       var options = { method: 'POST',
       url: 'https://slack.com/api/chat.postMessage',
       form: 
       {    //channel: eRequest.body.event.channel = undefined ?  eRequest.body.channel_name : '',
            channel: eRequest.body.channel_name,
            text: 'Versiones de Web Service',
            attachments: JSON.stringify(attachments)
        },
        headers: {
         'Content-Type': 'application/json',
         'Authorization' : `Bearer ${TOKEN10}`
      }
    };//fin options

    //envio a slack
    pasesService.requestGeneral(options, function(res){
      eResponse.status(200).json(res);
    });//fin requestGeneral

   });//fin getPasesHC

  break;

  //sección de ayuda del bot
  default:

   //seteo para enviar a slack
     var attachments =  [
              {
                "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Versión de Hiper Center Core*"
                  }
                },
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "`@pasesJedi getHCV or /board getHCV`"
                  }
                }
                ],
                "color":"#ff6600"
              },
              {
                "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Versión de Hiper Center WS*"
                  }

                },
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "`@pasesJedi getWSV or /board getWSV`"
                  }
                }
                ],
                "color":"#66ff33"
              }
              ];//fin attachments
       var options = { method: 'POST',
       url: 'https://slack.com/api/chat.postMessage',
       form: 
       {    //channel: eRequest.body.event.channel = undefined ?  eRequest.body.channel_name : '',
            channel: eRequest.body.channel_name,
            text: 'Parece Necesitas Ayuda :thinking_face:',
            attachments: JSON.stringify(attachments)
        },
        headers: {
         'Content-Type': 'application/json',
         'Authorization' : `Bearer ${TOKEN10}`
      }
    };//fin options

    //envio a slack
    pasesService.requestGeneral(options, function(res){
      eResponse.status(200).json(res);
    });//fin requestGeneral

  break;


  }//fin switch

};





exports.getPases = function(eRequest, eResponse) {
  pasesService.getPases(function(data){
    eResponse.send(data);
  });
};

exports.getPasePorId = function(eRequest, eResponse) {
  pasesService.getPasePorId(eRequest.params.idPase, function(data){
    eResponse.send(data);
  });
};



exports.editarPase= function(eRequest, eResponse) {
  pasesService.editarPase(eRequest.params.idPase, eRequest.body, function(data){
    eResponse.send(data);
  });
};

exports.eliminarPase = function(eRequest, eResponse) {
  pasesService.eliminarPase(eRequest.params.idPase, function(data){
    eResponse.send(data);
  });
};

