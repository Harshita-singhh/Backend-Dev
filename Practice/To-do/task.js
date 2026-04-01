const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"]
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"]
  },

  dueDate: {
    type: Date
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Task", taskSchema);