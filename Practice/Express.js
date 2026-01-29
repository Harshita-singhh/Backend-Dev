// Import required modules
const http = require("http");
const fs = require("fs");
const url = require("url");

// Create HTTP server
const myServer = http.createServer((req, res) => {

  // Ignore browser favicon request
  if (req.url === "/favicon.ico") return res.end();

  // Create log message using template literal
  const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;

  // Parse URL to get pathname and query parameters
  const myUrl = url.parse(req.url, true);

  // Append request log into file
  fs.appendFile("ExpressJS/Expresslog.txt", log, () => {

    // Set response type
    res.setHeader("Content-Type", "text/plain");

    // Routing using switch case
    switch (myUrl.pathname) {

      // ---------------- HOME ROUTE ----------------
      case "/":
        if (req.method === "GET") {
          res.end("Home Page");
        }
        break;

      // ---------------- ABOUT ROUTE ----------------
      case "/about":
        if (req.method === "GET") {
          // Read query parameter from URL
          const username = myUrl.query.myname || "Guest";
          res.end(`Hi, ${username}`);
        }
        break;

      // ---------------- SEARCH ROUTE ----------------
      case "/search":
        if (req.method === "GET") {
          const search = myUrl.query.search_query;
          res.end("Here are your results for " + search);
        }
        break;

      // ---------------- SIGNUP ROUTE ----------------
      case "/signup":
        if (req.method === "GET") {
          res.end("This is a signup form");
        } 
        else if (req.method === "POST") {
          res.end("User Registered Successfully");
        }
        break;

      // ---------------- USER ROUTE ----------------
      case "/user":

        // PUT → full update
        if (req.method === "PUT") {
          res.end("User details updated completely (PUT)");
        }

        // PATCH → partial update
        else if (req.method === "PATCH") {
          res.end("User details updated partially (PATCH)");
        }

        // DELETE → remove user
        else if (req.method === "DELETE") {
          res.end("User deleted successfully (DELETE)");
        }
        break;

      // ---------------- DEFAULT ----------------
      default:
        res.statusCode = 404;
        res.end("404 Not Found");
    }
  });
});

// Start server
myServer.listen(8000, () => {
  console.log("Server Started on port 8000");
});
