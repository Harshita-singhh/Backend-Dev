const fs = require("fs");
const path = require("path");

const sourceDir = "source";
const targetDir = "target";

try {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  const sourceFiles = fs.readdirSync(sourceDir);

  sourceFiles.forEach((file) => {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(targetDir, file);

    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${file}`);
    }
  });

  console.log("Synchronization completed");

} catch (err) {
  console.log("Error:", err.message);
}
