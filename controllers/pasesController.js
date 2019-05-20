var pasesService = require('../businessLogic/pasesService.js'),
path = require('path'),
fs = require('fs'),
http =  require('https'),
request = require('request');

const envKey = process.env.TOKEN10;

exports.general = function(eRequest, eResponse) {
   console.log(eRequest.body.type);

  if(eRequest.body.event.type === 'url_verification'){
    pasesService.challenge(eRequest.body, function(data){
        eResponse.send(data);  
    });
  }

  switch(eRequest.body.event.type){

    case 'app_mention':
        console.log('asd');
        if(eRequest.body.text = "addPase"){

          var options = { method: 'POST',
          url: 'https://slack.com/api/chat.postMessage',
          form: 
          { channel: eRequest.body.event.channel,
            text:'What is the Name?'
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${envKey}`
          }
        };
         pasesService.requestGeneral(options, function(res){
            eResponse.status(200).json(res);
         })
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

