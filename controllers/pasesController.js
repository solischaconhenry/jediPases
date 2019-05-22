var pasesService = require('../businessLogic/pasesService.js'),
path = require('path'),
fs = require('fs'),
http =  require('https'),
request = require('request');
const TOKEN10 = process.env.TOKEN10;


exports.general = function(eRequest, eResponse) {

  if(eRequest.body.type === 'url_verification'){
    pasesService.challenge(eRequest.body, function(data){
      eResponse.send(data);  
    });
  }

  switch(eRequest.body.event.type){

    case 'app_mention':

    if(eRequest.body.text = "getHCV"){

      //pedir trello
      pasesService.getPasesHC(function(res){
         
         //seteo para enviar a slack
         var attachments = [{
                      fallback: 'Más Información - https://trello.com/b/9UyXF5Fc/releasehcenter',
                      text: '<https://trello.com/b/9UyXF5Fc/releasehcenter> - Más Información',
                      color: "#F35A00",
                      author_name: "#TEAM-JEDI",
                      footer: "pasesBac",
                      fields: res
              }]
         var options = { method: 'POST',
         url: 'https://slack.com/api/chat.postMessage',
         form: 
         {    channel: eRequest.body.event.channel,
              text: 'Versiones de HCenter',
              attachments: JSON.stringify(attachments)
          },
          headers: {
           'Content-Type': 'application/json',
           'Authorization' : `Bearer ${TOKEN10}`
        }
      };//fin options
       //eResponse.status(200).json(options);
      //envio a slack
      pasesService.requestGeneral(options, function(res){
        eResponse.status(200).json(res);
      });

  });



    }
    break;
  }
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

