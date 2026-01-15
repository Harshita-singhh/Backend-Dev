const url =require("url");
const http=require("http");
const myServer=http.createServer((req,res)=>{
    const myUrl=url.parse(req.url,true);
    console.log(myUrl.pathname);
    switch(myUrl.pathname){
        case "/":
            res.write("This is Home Page");
            break;
            case "/about":
                const username=myUrl.query.myname;
                res.end(`This is About Page. Welcome ${username}`);
                break;
                default:
                    res.end("404 Page Not Found");
    }
});
myServer.listen(8000,()=>console.log("Server Started"));