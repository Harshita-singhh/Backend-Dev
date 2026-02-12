const express = require("express");
const app = express();

// create a middleware which will execute before route handler
app.use((re, res, next) =>{
    console.log("Middleware 1");
    next();
});

// create another middleware which will execute after first middleware and before route handler
app.use((req, res, next) =>{
    console.log("Middleware 2");
    next();
});

app.get("/test", (req,res) => {
    return res.send("Route Executed");
});

app.listen(8000, () => console.log("Server Started"));