var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongodb = require('mongodb');

var serverPort = 8090;
var dbPort = 27017;
var dbName = 'wizer';
var dbHost = 'localhost';
var dbUri = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

// Includes
app.use(express.static('../app'));

// Redirections
app.get('/', function(req,res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/Profile', function(req,res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/Favorites', function(req,res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/Messaging', function(req,res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/Options', function(req,res) {
	res.sendFile(__dirname + '/index.html');
});


mongodb.MongoClient.connect(dbUri, function(error, db) {
	if (error) {
		console.log(error);
	}
	// Queries
	app.post('/ask',function(req,res){
		req.on('data', function(chunk) {
			var query = JSON.parse(chunk);
			db.collection('queries').insert(query);
		});
	  	res.end();
	});
	app.get('/feed', function(req,res) {
		db.collection('queries').find().toArray(function(err, docs) {
			res.json(docs);
		});
	});

	// Comments
	app.post('/comment',function(req,res){
		req.on('data', function(chunk) {
			var comment = JSON.parse(chunk);
			db.collection('comments_' + comment.queryId).insert(comment);
		});
	  	res.end();
	});

	app.get('/getComments', function(req,res) {	
		db.collection('comments_' + req.query.queryId).find(req.query).toArray(function(err, docs) {
			res.json(docs);
		});
	});

	// Users
	app.post('/signup',function(req,res){
		req.on('data', function(chunk) {
			var user = JSON.parse(chunk);
			db.collection('users').insert(user);
		});
	  	res.end();
	});
	app.get('/users', function(req,res) {
		db.collection('users').find(req.query).toArray(function(err, docs) {
			var userInfo = {};
			if (docs.length > 0) {
				userInfo.name = docs[0].name;
				userInfo.pic = docs[0].pic;
				userInfo.email = docs[0].email;
			}
			res.json(userInfo);
		});
	});
	app.get('/signin', function(req,res) {	
		db.collection('users').find(req.query).toArray(function(err, docs) {
			var allowed = docs.length > 0;
			res.json({allowed: allowed});
		});
	});

	// Session
	app.get('/testToken', function(req,res) {
		db.collection('users').find(req.query).toArray(function(err, docs) {
			var result = false;
			if (docs.length > 0) {
				result = true;
			}
			res.json(result);
		});
	});
	app.get('/getToken', function(req,res) {
		db.collection('users').find(req.query).toArray(function(err, docs) {

			var rand = function() {
			    return Math.random().toString(36).substr(2);
			};
			var token = function() {
			    return rand() + rand();
			};
			var userToken = token(); 

			if (docs.length > 0) {
				db.collection('users').update(req.query, {$set:{"token": userToken}})
			}
			res.json(userToken);
		});
	});

});


// Turn server on
server.listen(serverPort, function() {
	console.log("connected to db - " + dbUri);
	console.log("listening on port " + serverPort);
});


/*
server.on('request', function(request, response) {
	var newFile = fs.createWriteStream('copy.txt');
	var fileBytes = request.headers['content-length'];
	var uploadedBytes = 0;

	request.on('readable', function() {
		var chunk = null;
		while(null !== (chunk = request.read())) {
			uploadedBytes += chunk.length;
			var progress = (uploadedBytes / fileBytes) * 100;
			response.write('progress: ' + parseInt(progress, 10) + "%\n");
		}
	});
	request.on('end', function() {
		response.write('uploaded!');
		response.end();
	});
	request.pipe(newFile);

}).listen(8080);*/