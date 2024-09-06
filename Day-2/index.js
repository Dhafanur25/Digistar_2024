const http = require("http");

function logRequest(req) {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}`;
  console.log(log);
}

const server = http.createServer((req, res) => {
  logRequest(req);

  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h2> Hello, Digistar! </h2>");
  } else if (req.url === "/info") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(
      `HTTP Version: ${req.httpVersion}\nMethod: ${req.method}\nURL:${req.url}`
    );
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h2> Hello, Ini Halaman About Digistar! </h2>");
  } else if (req.url === "/submit" && req.method === "POST") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h2> Data submitted successfully! </h2>");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<h2> Page Not Found </h2>");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
