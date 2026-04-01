const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true,
    min: [19, "Age must be greater than 18"]
  }
});

module.exports = mongoose.model("Student", studentSchema);