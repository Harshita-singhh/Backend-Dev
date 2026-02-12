// const http=require("http");
// const express =require("express");
// const app= express();
// app.get("/",(req,res)=>{
//     return res.send("Home Page");
// });
// app.get("/about",(req,res)=>{
//     return res.send("About Page");
// });

// // const myServer = http.createServer(app);
// myServer.listen(8000,()=>{
//     console.log("Server is running on port 8000");
// });


const express = require("express");
const app = express();

// ABOUT PAGE
app.get("/about", (req, res) => {
  const name = "Harshita";
  const age = 20;

  res.send(`My name is ${name} and my age is ${age}`);
});

// ATTENDANCE PAGE
app.get("/attendance", (req, res) => {
  const status = req.query.status;
  
  if (status) {
    res.send(`Attendance status: ${status}`);
  } else {
    res.send("Please provide attendance status as a query parameter");
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});