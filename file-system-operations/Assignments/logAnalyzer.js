const fs = require("fs");
const readline = require("readline");

let errorCount = 0;
let warningCount = 0;
let infoCount = 0;

const stream = fs.createReadStream("log.txt");

const rl = readline.createInterface({
  input: stream,
  crlfDelay: Infinity
});

rl.on("line", (line) => {
  if (line.includes("ERROR")) errorCount++;
  else if (line.includes("WARNING")) warningCount++;
  else if (line.includes("INFO")) infoCount++;
});

rl.on("close", () => {
  const report =
    `Log Summary Report\n` +
    `Errors: ${errorCount}\n` +
    `Warnings: ${warningCount}\n` +
    `Info: ${infoCount}\n`;

  fs.writeFileSync("report.txt", report);
  console.log("Log analysis completed");
});
