var http = require('http'),
	url = require("url"),
	querystring = require("querystring"),
	fs = require('fs'),

	SAVE_FILE = "/tmp/at.json",

	handleRetrieve = function (req,res) {
		var params = querystring.parse(url.parse(req.url).query);
		fs.readFile(SAVE_FILE, 'utf8', function (err, data) {
			if (err) {
				console.log("Error reading " + SAVE_FILE + " : ",err);
			}
			var output = data;
			console.log('sending', output);

			res.writeHead(200, {"Content-Type": "application/json"});
			res.write(params.callback+'(');
			res.write(output);
			res.write(');');
			res.end();

		});

	},

	handleSave = function (req, res) {

		var params = url.parse(req.url).query,

			output =  decodeURI(params),
			fileName = SAVE_FILE;

		console.log('req.url', req.url);
		console.log('url.parse(req.url).query', url.parse(req.url).query);
		console.log("output: " + output);
		console.log("save params: ", params);
		console.log("writing to: " + fileName);

		fs.writeFile(fileName, output, function(err) {
			if(err) {
				console.log(err);
			} else {
					console.log("The file was saved! " + fileName);
			}
		});


		res.writeHead(200, {"Content-Type": "application/json"});
		res.write('{success: true}');
		res.end();

	},

	handleRequest = function (req, res) {

		console.log('handling request ',req.url);

		try {
			var pathname = url.parse(req.url).pathname;

			if (pathname === '/retrieve') {
				handleRetrieve(req,res);
			}
			else if (pathname === '/save') {
				handleSave(req,res);
			} else {
			    console.log("Unknown request");
			    res.writeHead(500, {"Content-Type": "text/plain"});
			    res.write("Unknown request");
			    res.end();
			}
		} catch (err) {
			console.log("unanticipated error: " + err);
		}
	};

http.createServer(handleRequest).listen(3000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:3000/');
