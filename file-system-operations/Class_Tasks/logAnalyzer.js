const fs = require("fs");
const readline = require("readline");

const logFile = "log.txt";

// counters
let totalLines = 0;
let errorCount = 0;
let warningCount = 0;
let infoCount = 0;

// check if file exists first
if (!fs.existsSync(logFile)) {
  console.log("Error: log.txt file not found in current directory");
  process.exit(1);
}

// create read stream
const readStream = fs.createReadStream(logFile, {
  encoding: "utf8"
});

// handle stream error safely
readStream.on("error", (err) => {
  console.log("File error:", err.message);
});

// readline interface
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

// read file line by line
rl.on("line", (line) => {
  totalLines++;

  if (line.includes("ERROR")) errorCount++;
  else if (line.includes("WARNING")) warningCount++;
  else if (line.includes("INFO")) infoCount++;
});

// when finished
rl.on("close", () => {
  const report =
`LOG FILE ANALYSIS REPORT
-------------------------
Total Lines   : ${totalLines}
ERROR Count   : ${errorCount}
WARNING Count : ${warningCount}
INFO Count    : ${infoCount}
`;

  fs.writeFile("report.txt", report, (err) => {
    if (err) {
      console.log("Error writing report:", err.message);
    } else {
      console.log("Log analysis completed successfully");
    }
  });
});
