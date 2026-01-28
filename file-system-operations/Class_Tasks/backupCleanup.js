const fs = require("fs").promises;
const path = require("path");

const SOURCE_DIR = "uploads";
const BACKUP_DIR = "backup";
const LOG_FILE = "backup.log";

const DAYS_7 = 7 * 24 * 60 * 60 * 1000;

// utility function to log actions
async function writeLog(message) {
  const time = new Date().toISOString();
  await fs.appendFile(LOG_FILE, `[${time}] ${message}\n`);
}

// main function
async function backupAndCleanup() {
  try {
    // check source directory
    try {
      await fs.access(SOURCE_DIR);
    } catch {
      console.log("Uploads directory not found.");
      return;
    }

    // create backup directory if missing
    try {
      await fs.access(BACKUP_DIR);
    } catch {
      await fs.mkdir(BACKUP_DIR);
      await writeLog("Backup directory created");
    }

    const files = await fs.readdir(SOURCE_DIR);

    for (const file of files) {
      const filePath = path.join(SOURCE_DIR, file);
      const backupPath = path.join(
        BACKUP_DIR,
        `${Date.now()}_${file}`
      );

      const stats = await fs.stat(filePath);

      // backup file
      await fs.copyFile(filePath, backupPath);
      await writeLog(`Backed up: ${file}`);

      // delete files older than 7 days
      const fileAge = Date.now() - stats.mtimeMs;

      if (fileAge > DAYS_7) {
        await fs.unlink(filePath);
        await writeLog(`Deleted old file: ${file}`);
      }
    }

    console.log("Backup and cleanup completed successfully");

  } catch (err) {
    await writeLog(`ERROR: ${err.message}`);
    console.log("Operation failed:", err.message);
  }
}

backupAndCleanup();
