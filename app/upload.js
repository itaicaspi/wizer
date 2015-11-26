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

// Receive connections
app.post('/ask',function(req,res){
	req.on('data', function(chunk) {
		mongodb.MongoClient.connect(dbUri, function(error, db) {
			if (error) {
				console.log(error);
			}

			var query = JSON.parse(chunk);
			db.collection('queries').insert(query);
		});
		/*fs.readFile('json/queries.json', function (err, data) {
		  	if (err) throw err;
		  	var jsonFile = JSON.parse(data);
		  	jsonFile.unshift(JSON.parse(chunk));
		  	fs.writeFile('json/queries.json', JSON.stringify(jsonFile));
		});*/
	});
  	res.end();
});

app.post('/signup',function(req,res){
	req.on('data', function(chunk) {
		mongodb.MongoClient.connect(dbUri, function(error, db) {
			if (error) {
				console.log(error);
			}

			var user = JSON.parse(chunk);
			db.collection('users').insert(user);
		});
	});
  	res.end();
});

app.get('/feed', function(req,res) {
	mongodb.MongoClient.connect(dbUri, function(error, db) {
		if (error) {
			console.log(error);
		}

		db.collection('queries').find().toArray(function(err, docs) {
			res.json(docs);
		});
	});
});

app.get('/users', function(req,res) {

	mongodb.MongoClient.connect(dbUri, function(error, db) {
		if (error) {
			console.log(error);
		}
		
		db.collection('users').find(req.query).toArray(function(err, docs) {
			var userInfo = {};
			if (docs.length > 0) {
				userInfo.name = docs[0].name;
				userInfo.pic = docs[0].pic;
			}
			res.json(userInfo);
		});
	});

});

app.get('/signin', function(req,res) {

	mongodb.MongoClient.connect(dbUri, function(error, db) {
		if (error) {
			console.log(error);
		}
		
		db.collection('users').find(req.query).toArray(function(err, docs) {
			var allowed = docs.length > 0;
			res.json({allowed: allowed});
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