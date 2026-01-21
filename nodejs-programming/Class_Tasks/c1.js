const path = require("path");
const fs = require("fs");

const Stream = path.join(__dirname,"./stream.txt")

const readStream  = fs.readStream(Stream,{
    highWaterMark: 64*1024
})


readStream.on("data",(chunk)=>{
    console.log(chunk.toString())
})

readStream.on("end",()=>{
    console.log("Data Finshed")
})