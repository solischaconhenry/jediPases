var path = require('path'),
fs = require('fs'),
http =  require('https'),
request = require('request'),
repository = require('../dataAccess/repository.js');
const key = process.env.key,
token = process.env.token,
board = process.env.board;

exports.challenge = function(doc, callback) {
	var res = {
		challenge: doc.challenge
	}
	callback(res);
	
};

exports.requestGeneral = function(options,callback){
	request(options, function (err, res, body) {
          if (err) throw new Error(err);

          //console.log(body);
          var res2 = {
            statusCode: 200,
            status: 'OK',
            body: body,
            res: res
          }
          callback(res2);

     });
};


exports.getPasesHC = function(callback){
	//Obtener List de un Dashboard
	var options = { 
	  method: 'GET',
	  url: 'https://api.trello.com/1/boards/'+ `${board}`+'/lists',
	  qs: 
	   { cards: 'all',
	     card_fields: 'all',
	     filter: 'open',
	     fields: 'all',
	     key: `${key}`,
	     token: `${token}` 
	 	} 
	 };
	 this.requestGeneral(options,function(data){
	 	var res = [];
	 	var dataParse = JSON.parse(data.body) // se parsea la data del json para array
	 	
	 	for (var i = 0; i < dataParse.length; i++) {
	 		let datos = {
		 			title : 'Versión',
		 			value: dataParse[i].cards[0].name,
		 			short: true
	 			};
	 		let datos2 = {
		 			title : 'Sitio',
		 			value: dataParse[i].name,
		 			short: true	
	 			};
	 		
	 		res.push(datos);
	 		res.push(datos2);
	 	}
	 	callback(res);
	 });
};



exports.getPases = function(callback) {
	var params = {
		query: {},
		collection: 'pases'
	};
	repository.getCollection(params, function(data){
		callback(data);
	});
};

exports.getPasePorId = function(idPase, callback) {
	var params = {
		query: {_id: idPase},
		collection: 'pases'
	};
	repository.getDocument(params, function(data){
		callback(data);
	});
};



exports.editarPase = function(idPase, doc, callback) {
	var params = {
		query: {_id: idPase},
		updateQuery: {$set: doc},
		collection: 'pases'
	};
	console.log(doc);
	repository.updateDocument(params, function(res) {
		callback(res);
	});
};

exports.eliminarPase = function(idPase, callback) {
	var params = {
		query: {_id: idPase},
		collection: 'pases'
	};
	repository.deleteDocument(params, function(res) {
		callback(res);
	});
};

