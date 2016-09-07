/**
*
* Server
*
* Runs on top of node.
*
* Usage:
*     node node/server.js
*
* This is a very basic web server that will serve simple page requests and
* saves and retrieves JSON data to a file.
*
* The filename is defined in SAVE_FILE. Ensure that the process running this
* server has permissions to read and write from that file, and from the BASE
* directory.
*
*
*/
var http = require('http'),
	url = require('url'),
	querystring = require('querystring'),
	fs = require('fs'),

	PORT = 7000,
	SAVE_FILE = '/tmp/at.json',
	BASE = 'public', // base of public file directory

	handlePageRequest = function (path, req, res) {
		var filePath = path === '/' ? '/index.html' : path, // default to index.html
			file = BASE + filePath,

			// Naiively set the content type based on the extension
			contentType = path.indexOf('.js') > 0 ?
				'application/javascript' : (path.indexOf('.css') > 0 ? 'text/css' : 'text/html');

		fs.readFile(file, 'utf8', function (err, data) {
			if (err) {
				console.error('Error reading ' + file + ' : ',err);
				res.writeHead(404, {'Content-Type': 'text/html'});
				res.write(err.code);
				res.end();
			} else {
				res.writeHead(200, {'Content-Type': contentType});
				res.write(data);
				res.end();
			}
		});

	},

	handleRetrieve = function (req,res) {
		var params = querystring.parse(url.parse(req.url).query);
		fs.readFile(SAVE_FILE, 'utf8', function (err, data) {
			if (err) {
				console.log("Error reading " + SAVE_FILE + " : ",err);
			}
			res.writeHead(200, {"Content-Type": "application/json"});
			res.write(params.callback ? params.callback + '(' : '');
			res.write(data);
			res.write(params.callback ? ');' : '');
			res.end();
		});

	},

	handleSave = function (req, res) {

		var params = url.parse(req.url).query,
			output =  decodeURI(params),
			fileName = SAVE_FILE;

		console.log('saving: ',output,' to: ', fileName);

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
			    handlePageRequest(pathname, req, res);
			}
		} catch (err) {
			console.log("unanticipated error: " + err);
		}
	};

http.createServer(handleRequest).listen(PORT, "127.0.0.1");
console.log('Server running at http://127.0.0.1:' + PORT + '/');
