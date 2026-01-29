const http = require("http");
const server = http.createServer((req,res)=>{
    // res.write("Hello World");
    // res.end();
    res.setHeader("content-Type","text/html");
    if(req.url==="/"){
        res.end("Home Page");
    }else if(req.url==="/about"){
        res.end("About Page");
    }else{
        res.end("Error Page");
    }
});
server.listen(8000,()=>{
    console.log("server is running")
});