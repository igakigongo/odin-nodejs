const fs = require("fs");
const http = require("http");
const url = require("url");

const port = 4000;
const server = http.createServer(function(req, res) {
	const urlWithParsedQuery = url.parse(req.url, true);
	const pathName = urlWithParsedQuery.pathname;
	const fileName = pathName === "/" ? "./index.html" : `.${pathName}`;

	console.log(fileName);
	fs.readFile(fileName, function(err, data) {
		if (err) {
			res.writeHead(404, { "Content-Type": "text/html" });
			return res.end("404 - Document Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
	});
});

server.listen(port, function() {
	console.log(`Server started, listening on port: ${port}`);
});
