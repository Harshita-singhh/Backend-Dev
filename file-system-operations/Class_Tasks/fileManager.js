const fs = require("fs");
const path = require("path");

// Command line arguments
const command = process.argv[2];
const fileName = process.argv[3];
const content = process.argv.slice(4).join(" ");

function handleError(err) {
  if (err.code === "ENOENT") {
    console.log("Error: File or directory not found");
  } else if (err.code === "EACCES") {
    console.log("Error: Permission denied");
  } else {
    console.log("Error:", err.message);
  }
}

// READ FILE
if (command === "read") {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) return handleError(err);
    console.log("File Content:\n", data);
  });
}

// WRITE FILE
else if (command === "write") {
  fs.writeFile(fileName, content, (err) => {
    if (err) return handleError(err);
    console.log("File written successfully");
  });
}

// APPEND LOGS
else if (command === "append") {
  fs.appendFile(fileName, content + "\n", (err) => {
    if (err) return handleError(err);
    console.log("Content appended successfully");
  });
}

// COPY FILE
else if (command === "copy") {
  const destination = process.argv[4];

  fs.copyFile(fileName, destination, (err) => {
    if (err) return handleError(err);
    console.log("File copied successfully");
  });
}

// DELETE FILE
else if (command === "delete") {
  fs.unlink(fileName, (err) => {
    if (err) return handleError(err);
    console.log("File deleted successfully");
  });
}

// LIST DIRECTORY
else if (command === "list") {
  const dir = fileName || ".";

  fs.readdir(dir, (err, files) => {
    if (err) return handleError(err);
    console.log("Directory contents:");
    files.forEach(file => console.log(file));
  });
}

else {
  console.log(`
Invalid command ❌

Available commands:
node fileManager.js read <file>
node fileManager.js write <file> <content>
node fileManager.js append <file> <content>
node fileManager.js copy <source> <destination>
node fileManager.js delete <file>
node fileManager.js list <directory>
`);
}
