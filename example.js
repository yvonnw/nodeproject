var http = require('http');
http.createServer(function (req, res){
	res.writeHead(200, {'content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1234);
console.log('Server running at http://localhost:1234/');
