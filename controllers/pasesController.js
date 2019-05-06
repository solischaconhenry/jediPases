var pasesService = require('../businessLogic/pasesService.js'); 

exports.general = function(eRequest, eResponse) {
  console.log(eRequest.body.type);
  console.log(eRequest.body);

  if(eRequest.body.type === 'url_verification'){
    console.log(eRequest.body.type);

    pasesService.challenge(eRequest.body, function(data){
        eResponse.send(data);  
    });
  }

  else if(eRequest.body.event.type === 'message'){
    
    pasesService.nuevoPase(eRequest.body, function(data){
          console.log(data);
          eResponse.send(data);
          console.log(data);
      });
  }
  else if(eRequest.body.event.type === 'app_mention'){
    pasesService.nuevoPase(eRequest.body);
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

