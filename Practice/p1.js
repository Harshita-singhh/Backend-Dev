const fs = require("fs")
const path = require("path")

const mainfolder  = path.join(__dirname,"mainfolder")
const subfolder1  = path.join(mainfolder,"subfolder1")
const subfolder2  = path.join(mainfolder,"subfolder2")
const filePath  = path.join(subfolder2,"hello.txt")


fs.mkdirSync(mainfolder)
fs.mkdirSync(subfolder1)
fs.mkdirSync(subfolder2)

fs.writeFileSync(filePath,"Hello World","utf-8")