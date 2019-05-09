var path = require('path'),
fs = require('fs'),
http =  require('https'),
request = require('request'),
repository = require('../dataAccess/repository.js');
const envKey = process.env.TOKEN7;

exports.nuevoPase = function(doc, callback) {
	var params = {
		query: doc,
		collection: 'pases'
	};
	console.log(doc)
	;
	if(doc.text = "addPase"){

		//data
		let body = {
			channel: doc.event.channel,
			text:'What is the Name?'
		};

		var url = "https://slack.com/api/chat.postMessage";

		let headers = {
			'Content-Type': 'application/json',
			'Authorization' : `Bearer ${process.env.TOKEN7}`
		};

		var req = request.post({
			"url": url,
			"headers": headers,
			"body": JSON.stringify(body)
		}, (err, response, body) => {
			if (err && body != '') {
        		// Print out the response body
        		console.log(body)

    		}
			if (!err && response.statusCode == 200) {
        		// Print out the response body
        		console.log(body)

    		}
    		callback(body);
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

