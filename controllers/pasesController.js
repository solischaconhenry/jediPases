var pasesService = require('../businessLogic/pasesService.js'),
path = require('path'),
fs = require('fs'),
http =  require('https'),
request = require('request');

const envKey = process.env.TOKEN10;

exports.general = function(eRequest, eResponse) {


 
  if(eRequest.body.type === 'url_verification'){
    console.log(eRequest.body.type);

    pasesService.challenge(eRequest.body, function(data){
      eResponse.send(data);  
    });
  }

  else if(eRequest.body.event.type === 'message'){

    pasesService.nuevoPase(eRequest.body, function(data){

      eResponse.sendStatus(200);
    });
  }

  else if(eRequest.body.event.type === 'app_mention'){

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

  request(options, function (err, res, body) {
    if (err) throw new Error(err);

    console.log(body);
    eResponse.status(200).json({
          statusCode: 200,
          status: 'OK'
    });

  });

  }
};

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

