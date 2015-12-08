var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongodb = require('mongodb');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

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
	app.post('/api/ask',function(req,res){
		req.on('data', function(chunk) {
			var query = JSON.parse(chunk);
			db.collection('queries').insert(query);
			db.collection('users').update({"email":query.owner}, {$inc:{"questions": 1}})
		});
	  	res.end();
	});
	app.get('/api/feed', function(req,res) {
		db.collection('queries').find().toArray(function(err, docs) {
			res.json(docs);
		});
	});

	// Comments
	app.post('/api/comment',function(req,res){
		req.on('data', function(chunk) {
			var comment = JSON.parse(chunk);
			db.collection('comments_' + comment.queryId).insert(comment);
		});
	  	res.end();
	});

	app.get('/api/getComments', function(req,res) {	
		db.collection('comments_' + req.query.queryId).find(req.query).toArray(function(err, docs) {
			res.json(docs);
		});
	});

	// Users
	app.post('/api/signup',function(req,res){
		req.on('data', function(chunk) {
			var user = JSON.parse(chunk);
			db.collection('users').insert(user);
		});
	  	res.end();
	});
	app.get('/api/users', function(req,res) {
		db.collection('users').find(req.query).toArray(function(err, docs) {
			var userInfo = {};
			if (docs.length > 0) {
				userInfo = docs[0];
				// hide private info
				userInfo.password = '';
				userInfo.token = '';
				//userInfo.balance = '';
			}
			res.json(userInfo);
		});
	});
	app.get('/api/signin', function(req,res) {	
		db.collection('users').find(req.query).toArray(function(err, docs) {
			var allowed = docs.length > 0;
			res.json({allowed: allowed});
		});
	});

	// Session
	app.get('/api/testToken', function(req,res) {
		db.collection('users').find(req.query).toArray(function(err, docs) {
			var result = false;
			if (docs.length > 0) {
				result = true;
			}
			res.json(result);
		});
	});
	app.get('/api/getToken', function(req,res) {
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

	// Upload profile pic
	app.post('/api/picUpload', upload.single('file'), function(req,res) {
		var filename = req.body.user;
		var newPath = __dirname + "/uploads/profilePics/" + filename + ".jpg";
		fs.rename(req.file.path, newPath);
		/*fs.readFile(req.file.path, function (err, data) {

			fs.writeFile(newPath, data, function (err) {
			  res.redirect("back");
			});
		});*/
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