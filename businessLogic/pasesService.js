var path = require('path'),
	fs = require('fs'),
 	repository = require('../dataAccess/repository.js');
const envKey = process.env.JOKES_BOT_TOKEN  	

exports.nuevoPase = function(doc, callback) {
	var params = {
		query: doc,
		collection: 'pases'
	};
	console.log(doc);
	if(doc.text = "addPase"){
		var res = {
			token: envKey,
		    channel: doc.event.channel,
		    text:"What's the Name?"
		}
		callback(res);
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

