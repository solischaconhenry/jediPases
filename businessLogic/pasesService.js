var path = require('path'),
fs = require('fs'),
http =  require('https'),
request = require('request'),
repository = require('../dataAccess/repository.js');
const envKey = process.env.JOKES_BOT_TOKEN || 'xoxb-544505390529-599643524034-zZfX4NFaSR7c6npK6gu3Fi4P';

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
			'Authorization' : "Bearer " + envKey
		};

		request.post({
			"url": url,
			"headers": headers,
			"body": JSON.stringify(body)
		}, (err, response, body) => {
			if (err) {
				reject(err);
			}
			console.log("response: ", JSON.stringify(response));
			console.log("body: ",body);
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

