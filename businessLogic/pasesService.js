var path = require('path'),
	fs = require('fs'),
	https =  require('https'),
 	repository = require('../dataAccess/repository.js');
const envKey = process.env.JOKES_BOT_TOKEN  	

exports.nuevoPase = function(doc, callback) {
	var params = {
		query: doc,
		collection: 'pases'
	};
	console.log(doc);
	if(doc.text = "addPase"){
		const data = JSON.stringify({
		 	token: envKey,
		    channel: doc.event.channel,
		    text:'What is the Name?'
		});

		const options = {
		  host: 'https://slack.com',
		  path: '/api/chat.postMessage',
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		    'Content-Length': Buffer.byteLength(data)
		  }
		};

		const req = https.get('https://slack.com/api/chat.postMessage', (res) => {
		  console.log(`STATUS: ${res.statusCode}`);
		  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

		  res.setEncoding('utf8');
		  res.on('data', (chunk) => {
		    console.log(`BODY: ${chunk}`);
		  });
		  res.on('end', () => {
		    console.log('No more data in response.');
		  });
		});

		req.on('error', (e) => {
		  console.error(`problem with request: ${e.message}`);
		});

		// Write data to request body
		req.write(data);
		req.end();
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

