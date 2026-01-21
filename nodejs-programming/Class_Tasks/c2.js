const fs = require("fs");
const path = require("path");
const { Transform }  = require("stream")

const upperCaseTransform = new Transform({
    transform(chunk,encoding,callback){
        let upperCase = chunk.toString().toUpperCase();
        callback(null ,upperCase)
    }
})


const VowelsToStarTransform = new Transform({
    transform(chunk,encoding,callback){
        const result = chunk.toString().replace(/[aeiou]/gi, "*");
        callback(null ,result)
    }
})


const Stream = path.join(__dirname,"./stream.txt")
const output = path.join(__dirname,"./Streamoutput.txt")

const readStream = fs.createReadStream(Stream)
const writeStream  = fs.createWriteStream(output)

readStream.pipe(upperCaseTransform).pipe(VowelsToStarTransform).pipe(writeStream)



// copy a file 

// readStream.pipe(writeStream)