const mongoose = require("mongoose");
const Student = require("./student.model");
mongoose.connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


async function run() {
  try {
    const data = await Student.create({
      name: "Adishri",
      age: 20,
      name: "bhumi",
      age:22,
      name:"sneha",
        age: 19
    });

    console.log("Data Inserted:", data);
  } catch (err) {
    console.log(" Error:", err.message);
  }
}

run();