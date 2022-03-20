var http = require("http");
var fs = require("fs");
var server = http.createServer(handleSever);
function handleSever(req, res) {
  var store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.url === "/" && req.method === "GET") {
      res.setHeader("Content-Type", "text/html");
      return fs.createReadStream("./index.html").pipe(res);
    } else if (req.url.split(".").pop() === "css" && req.method === "GET") {
      var cssPath = __dirname + req.url;
      res.setHeader("Content-Type", "text/css");
      return fs.createReadStream(cssPath).pipe(res);
    } else if (req.url.split(".").pop() === "jpg" && req.method === "GET") {
      var imgPath = __dirname + req.url;
      res.setHeader("Content-Type", "image/jpg");
      return fs.createReadStream(imgPath).pipe(res);
    }

    // about
    if (req.url === "/about" && req.method === "GET") {
      let aboutPath = __dirname + req.url;
      res.setHeader("Content-Type", "text/html");
      return fs.createReadStream(aboutPath + ".html").pipe(res);
    } else if (req.url.split(".").pop() === "css" && req.method === "GET") {
      let imgPath = __dirname + req.url;
      res.setHeader("Content-Type", "text/css");
      return fs.createReadStream(imgPath).pipe(res);
    } else if (req.url.split(".").pop() === "jpg" && req.method === "GET") {
      let imgPath = __dirname + req.url;
      res.setHeader("Content-Type", "image/jpg");
      return fs.createReadStream(imgPath).pipe(res);
    }

    if (req.url === "/contact" && req.method === "GET") {
      let formPath = __dirname + "/form.html";
      res.setHeader("Content-Type", "text/html");
      return fs.createReadStream(formPath).pipe(res);
    }

    // form

    if (req.url === "/form" && req.method === "POST") {
      let parsedData = qs.parse(store);
      let userName = parsedData.username;
      let rootPath = __dirname + "/contacts/";
      fs.open(rootPath + userName + ".json", "wx", (err, fd) => {
        if (err) throw new Error(`${userName} already exits`);
        fs.write(fd, JSON.stringify(parsedData), (err) => {
          if (err) return console.log(err);
          fs.close(fd, (err) => {
            if (err) return console.log(err);
            res.writeHead(200, { "Content-Type": "text/html" });
            return res.end("<h1>Contact Saved</h1>");
          });
        });
      });
    }
  });
}
server.listen(5000, () => {
  console.log("Server is listening to port ");
});
