const fs = require("fs");
const path = require("path");

const command = process.argv[2];
const fileName = process.argv[3];
const content = process.argv[4];

try {
  if (command === "read") {
    const data = fs.readFileSync(fileName, "utf8");
    console.log(data);
  }

  else if (command === "write") {
    fs.writeFileSync(fileName, content);
    console.log("File written successfully");
  }

  else if (command === "copy") {
    const destination = process.argv[4];
    fs.copyFileSync(fileName, destination);
    console.log("File copied successfully");
  }

  else if (command === "delete") {
    fs.unlinkSync(fileName);
    console.log("File deleted successfully");
  }

  else if (command === "list") {
    const files = fs.readdirSync(".");
    console.log("Directory contents:");
    console.log(files);
  }

  else {
    console.log("Invalid command");
  }
} catch (err) {
  console.log("Error:", err.message);
}
