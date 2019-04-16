var pasesService = require('../businessLogic/pasesService.js'); 

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

exports.nuevoPase = function(eRequest, eResponse) {
  pasesService.nuevoPase(eRequest.body, function(data){
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