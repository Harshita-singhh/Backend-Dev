const express = require("express");
const app = express();

// Attendance route
app.get("/attendance", (req, res) => {

  // Get values from query parameters
  const name = req.query.name;
  const status = req.query.status;

  // Validation
  if (!name || !status) {
    return res.send("Please provide name and attendance status");
  }

  // Attendance logic
  if (status === "present") {
    res.send(`${name} is marked Present ✅`);
  } 
  else if (status === "absent") {
    res.send(`${name} is marked Absent ❌`);
  } 
  else {
    res.send("Invalid attendance status");
  }
});

// Start server
app.listen(3000, () => {
  console.log("Attendance server running on port 3000");
});
