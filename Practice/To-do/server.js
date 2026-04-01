const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/todoDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error", err));


// Create Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);


// Create Model
const Task = mongoose.model("Task", taskSchema);


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// View tasks in browser (simple HTML)
app.get("/tasks", async (req, res) => {
  const allTasks = await Task.find({});

  const html = `
    <ul>
    ${allTasks.map((task) => `<li>${task.title}</li>`).join("")}
    </ul>
  `;

  res.send(html);
});


// Get all tasks (API)
app.get("/api/tasks", async (req, res) => {

  const { status, sort } = req.query;

  let query = {};

  if (status) {
    query.status = status;
  }

  let tasks = await Task.find(query);

  if (sort === "dueDate") {
    tasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  res.json(tasks);
});


// Get single task
app.get("/api/tasks/:id", async (req, res) => {

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});


// Create task
app.post("/api/tasks", async (req, res) => {

  const body = req.body;

  if (!body || !body.title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const result = await Task.create({
    title: body.title,
    description: body.description,
    priority: body.priority,
    status: body.status,
    dueDate: body.dueDate,
  });

  return res.status(201).json({
    message: "Task created successfully",
    task: result,
  });
});


// Update task
app.put("/api/tasks/:id", async (req, res) => {

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({
    message: "Task updated successfully",
    task: updatedTask,
  });
});


// Delete task
app.delete("/api/tasks/:id", async (req, res) => {

  await Task.findByIdAndDelete(req.params.id);

  res.json({
    message: "Task deleted successfully",
  });
});


app.listen(8000, () => {
  console.log("Server Started on Port 8000");
});