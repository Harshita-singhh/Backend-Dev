const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  let responseText = "";
  
  switch (req.url) {
    case "/":
      responseText = "This is Home page";
      break;
    case "/about":
      responseText = "This is About page";
      break;
    case "/contact":
      responseText = "This is Contact page";
      break;
    default:
      responseText = "404 page Not Found";
      break;
  }
    const log = `${Date.now()}| ${req.url} | ${responseText}\n`;
    res.writeHead(200, { "Content-Type": "text/plain" });
    fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file");
    } 
  });
  res.end(responseText);
});
myServer.listen(8000, () => console.log("Server Started"));