var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').createServer(app);

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
		fs.readFile('json/queries.json', function (err, data) {
		  	if (err) throw err;
		  	var jsonFile = JSON.parse(data);
		  	jsonFile.unshift(JSON.parse(chunk));
		  	fs.writeFile('json/queries.json', JSON.stringify(jsonFile));
		});
	});
  	res.end();
});

// Turn server on
server.listen(8090, function() {
	console.log("listening on port 8090");
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