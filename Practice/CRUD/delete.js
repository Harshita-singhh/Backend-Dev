//student having marks less than equals to 70 should get deleted and above 70, return a proper error message
const express = require('express'); 
const app = express(); 

app.use(express.json()); 

let students = [
    {id: 10, name: "Harshita", marks:69, city:"Delhi"},
    {id: 20, name: "Rahul", marks:70, city:"Mumbai"},
    {id: 30, name: "Priya", marks:80, city:"Bangalore"}
];

// view students
app.get("/students", (req, res) => {
    res.json(students);
});

// delete student by id only if marks <= 70
app.delete("/students/:id", (req, res) => { 
    const id = req.params.id; 
    const index = students.findIndex(s => s.id == id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    // check marks condition
    if (students[index].marks >= 70) {
        return res.status(400).json({ 
            message: "Cannot delete student with marks greater than or equal to 70" 
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        message: "Student deleted successfully",
        deletedStudent: deletedStudent[0]
    });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});


// const express = require('express'); //import express module
// const app = express(); //create express app
// app.use(express.json()); //use this to parse json data from request body

// let students = [
//     {id: 1, name: "Harshita", marks:60, city:"Delhi"},
//     {id: 2, name: "Rahul", marks:70, city:"Mumbai"},
//     {id: 3, name: "Priya", marks:80, city:"Bangalore"}
// ];

// //view student
// app.get("/students", (req, res) => {
//     res.json(students);
// });

// //Delete - delete a student by id
// app.delete("/students/:id", (req,res)=> {
//     const id = req.params.id;
// const index = students.findIndex(s => s.id == id); //find index of student by id
// console.log(index, index);
// if(index === -1){
//     return res.status(404).json({ message: "Student not found" });
// }
// const deletedStudent = students.splice(index, 1); //remove student from array
// res.json({
//     message: "Student deleted successfully",
//     deletedStudent: deletedStudent[0]
// })
// });

// app.listen(8000, () => {
//     console.log("Server is running on port 8000");
// });