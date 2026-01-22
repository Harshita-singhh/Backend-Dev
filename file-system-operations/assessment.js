const fs = require("fs");
//QUESTION 1
fs.writeFile(
  "assessment.txt",
  "1. What is the difference between synchronous and asynchronous file operations?\n" +
  "Synchronous file operations block the execution of the program until the file task is completed.\n" +
  "Asynchronous file operations do not block the program and execute in the background using callbacks, promises, or async/await.\n\n",
  (err) => {
    if (err) throw err;
  }
);

//QUESTION 2
fs.appendFile(
  "assessment.txt",
  "2. When should you use file streams instead of reading the entire file?\n" +
  "File streams should be used when working with large files because streams process data in small chunks instead of loading the whole file into memory, which improves performance and reduces memory usage.\n\n",
  (err) => {
    if (err) throw err;
  }
);

//QUESTION 3
fs.appendFile(
  "assessment.txt",
  "3. Explain the purpose of the 'utf8' encoding parameter in file operations.\n" +
  "The 'utf8' encoding parameter ensures that file data is read and written as human-readable text. Without encoding, Node.js treats file data as raw binary.\n\n",
  (err) => {
    if (err) throw err;
  }
);

//QUESTION 4
fs.appendFile(
  "assessment.txt",
  "4. What are the common error codes in file system operations and what do they mean?\n" +
  "ENOENT: File or directory not found\n" +
  "EACCES: Permission denied\n" +
  "EEXIST: File already exists\n" +
  "EPERM: Operation not permitted\n\n",
  (err) => {
    if (err) throw err;
  }
);

//QUESTION 5
fs.appendFile(
  "assessment.txt",
  "5. How would you safely delete a directory with all its contents?\n" +
  "A directory can be safely deleted using fs.rm() with recursive and force options, which removes all files and subfolders.\n" +
  "Example: fs.rm('folderName', { recursive: true, force: true })\n\n",
  (err) => {
    if (err) throw err;
  }
);

//QUESTION 6
fs.appendFile(
  "assessment.txt",
  "6. Explain the concept of piping in streams with an example.\n" +
  "Piping is used to connect a readable stream to a writable stream so that data flows automatically between them.\n" +
  "Example: readableStream.pipe(writableStream)\n\n",
  (err) => {
    if (err) throw err;
  }
);

//QUESTION 7
fs.appendFile(
  "assessment.txt",
  "7. Why is it important to handle errors in file operations?\n" +
  "Error handling is important to prevent application crashes and to handle issues such as missing files, permission problems, or invalid paths gracefully.\n\n",
  (err) => {
    if (err) throw err;
  }
);

//QUESTION 8
fs.appendFile(
  "assessment.txt",
  "8. What is the difference between writeFile and appendFile methods?\n" +
  "writeFile() creates a new file or overwrites existing content.\n" +
  "appendFile() adds new content at the end of the file without removing existing data.\n\n",
  (err) => {
    if (err) throw err;
  }
);
