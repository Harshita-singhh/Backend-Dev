// const express = require('express'); //import express module
// const app = express(); //create express app
// app.use(express.json()); //use this to parse json data from request body
// let students = [
//     {id: 1, name: "Harshita", marks:60, city:"Delhi"},
//     {id: 2, name: "Rahul", marks:70, city:"Mumbai"},
//     {id: 3, name: "Priya", marks:80, city:"Bangalore"}
// ];

// //view all students
// app.get("/students", (req, res) => {
//     res.json(students);
// });

// //Patch - update specific fields of a student
// app.patch("/students/:id", (req, res) => {
//     const id = req.params.id; //get id from url parameters
//     const updates = req.body; //get updates from request body
//     const student = students.find(s => s.id == id); //find student by id
//     if (!student) { 
//         return res.status(404).json({ message: "Student not found" }); 
//     }

//     //Apply partial updates
//     Object.assign(student, updates); //update student object with new values
//     res.json({ message: "Students updated successfully", student });
// });

// app.listen(8000, () => {
//     console.log("Server is running on port 8000");
// });





const express = require('express'); //import express module
const app = express(); //create express app
app.use(express.json()); //use this to parse json data from request body
let students = [
    {id: 1, name: "Harshita", marks:60, city:"Delhi"},
    {id: 2, name: "Rahul", marks:70, city:"Mumbai"},
    {id: 3, name: "Priya", marks:80, city:"Bangalore"}
];

//view all students
app.get("/students", (req, res) => {
    res.json(students);
});

//Patch - update marks of a student
app.patch("/students/:id", (req, res) => {
    const id = req.params.id; //get id from url parameters
    const newMarks = req.body.marks; //get new marks from request body
    const student = students.find(s => s.id == id); //find student by id
    if (student) { 
        student.marks = newMarks; //update marks of the student
        res.json({ message: "Students updated successfully", student });
    }else{
        res.status(404).json({ message: "Student not found" });  
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});