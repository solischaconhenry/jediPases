var path = require('path'),
fs = require('fs'),
http =  require('https'),
request = require('request'),
repository = require('../dataAccess/repository.js');
const envKey = process.env.TOKEN10;

exports.nuevoPase = function(doc, callback) {
	var params = {
		query: doc,
		collection: 'pases'
	};
	
	if(doc.text = "addPase"){

		var options = { method: 'POST',
		url: 'https://slack.com/api/chat.postMessage',
		form: 
			{ channel: doc.event.channel,
			  text:'What is the Name?'
			},
		headers: {
			'Content-Type': 'application/json',
			'Authorization' : `Bearer ${envKey}`
		}

		};
 

		
		request(options, function (error, response, body) {
		  if (error) throw new Error(error);

		  console.log(body);
		  callback(response);
		});

		
		





	}
};

exports.challenge = function(doc, callback) {
	var res = {
		challenge: doc.challenge
	}
	callback(res);
	
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

