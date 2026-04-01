const express = require("express");
const mongoose = require("mongoose");

const app = express();
//Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/blogDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error", err));

//Create Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String, 
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true },
);
// Create Model
const User = mongoose.model("User", userSchema);
// Middleware for form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// View Data
app.get("/user", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} ${user.lastName}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});

  res.json(allDbUsers);
});
// Create Data
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender,
  });
  // console.log("result", result);
  return res.status(201).json({
    message: "User created successfully",
    user: result,
  });
});

// Update User
app.patch("/api/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({ msg: "User Updated Successfully" });
});
//delete user
/*app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ msg: "User Deleted Successfully" });
}
);*/
/*app.delete("/api/users", async (req, res) => {
    const id= req.params.ids.split(",");
    const result = await user.deleteMany({ _id: { $in: id } });
*/
app.delete("/api/users/:ids", async (req, res) => {
  const ids = req.params.ids.split(",");

  const result = await User.deleteMany({
    _id: { $in: ids },
  });

  return res.json({
    message: "Users Deleted Successfully",
    result,
  });
});
app.listen(8000, () => {
  console.log("Server Started");
});