var http = require("http");
var dt = require("./myfirstmodule");
var fs = require("fs");
var url = require("url");

http
	.createServer(function(req, res) {
		if (req.url.startsWith("/getfile")) {
			fs.readFile("demofile1.html", function(err, data) {
				res.writeHead(200, { "Content-Type": "text/html" });
				res.write(data);
				res.end();
			});
		} else if (req.url.startsWith("/createfile")) {
			fs.unlink('samplefile', function (err) {
				err ? console.log(err): console.log('File deleted');
			});
			var q = url.parse(req.url, true).query;
			var message = q.message || "No message was received";
			fs.appendFile("samplefile.txt", dt.myDateTime() + `Message: ${message}\n`, function(err) {
				if (err) throw err;
				console.log("Saved!");
			});
			res.end();
		} else {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.write("<b>Request URL:</b> " + req.url + "<br />");
			res.write("Query String Parsing<br />");
			var q = url.parse(req.url, true).query;
			var txt = q.year + " " + q.month;
			res.write("Parsed values: " + txt + "<br />");
			res.write("<b>The date and time are currently:</b> " + dt.myDateTime());
			res.end();
		}
	})
	.listen(8080);
