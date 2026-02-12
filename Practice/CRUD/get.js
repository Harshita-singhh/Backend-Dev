//const http =require('http');
const express = require('express');

const app = express();

app.get("/", (req, res) => {
    return res.end("this is my jj  home page");
});

app.get("/about", (req, res) => {
    // const username = req.query.myname;
    // const userage = req.query.age;
    // return res.end(`User name is ${username} \nUser age is ${userage}`);
    return res.send(
        "About page " + "Hey User " + req.query.myname + " Your age is " + req.query.age,
    )
});
// make student route and accept subject and score as query params and show student passed or failed based on score>40
app.get("/student", (req, res) => {
    const snumber = req.query.snumber;
    if (snumber > 40) {
        return res.send("You passed the " + req.query.subject + " exam");
    }
    else {
        return res.send(" You failed the " + req.query.subject + " exam");
    }
    //return res.send("Student page" + " Hello Student " + req.query.sname + " Your roll number is " + req.query.subject);
    ;
})
app.get("/attendance", (req, res) => {
    const present = req.query.present;
    if(present === "yes"){
        return res.send(req.query.sname + " is present");
    }
    else {
        return res.send(req.query.sname + " is absent")
    }
});


// const myServer = http.createServer(app);
app.listen(8000, () => console.log("Server Started"));