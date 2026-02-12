const express = require('express');

const app= express();

//server file from the 'public' directory
// Absolute path: C:\Users\manu\Desktop\NodeJS\public
// Relative path: Middleware\static.js or ./public

//const staticPath = __dirname + "/public"; // it is used to get the absolute path of the public folder
// const fullPath = path.join(__dirname, "public"); // it is used to get the absolute path of the public folder
//console.log("full path: ", fullPath);

app.use(express.static("public")); // it is used to serve the static files from the public folder

app.listen(8000, () => console.log("Server running on port 8000"));