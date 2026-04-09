// const express = require("express");
// const app = express();

// //built in middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// //Logger middleware
// const logger=(req,res,next)=>{
//     console.log("method", req.method);
//     console.log("url", req.url);
//     next();
// };

// //apply globally
// app.use(logger);


// //validation middleware

// const validate=(req,res,next)=>{
//     // Add validation logic here
//     const {name} = req.body;
//     if (!name) {
//         return res.status(400).json({ error: "Name is required" });
//     }
//     next();
// };

// //route specific middleware

// const checkAdmin=(req,res,next)=>{
//     //dummy check for admin role (real me DB/jwt token check hoga)
//     const isAdmin=true;
//     if(!isAdmin){
//         return res.status(403).json({error:"Access denied, Admins only"});
//     }
//     next();
// };

// //homeroute
// app.get("/",( req, res) => {    
//     res.send("Welcome to the Home Page");
// });


// //validation route middleware

// app.post("/user",validate,(req,res)=>{
//     res.json({message:"User created successfully", data:req.body});
// });

// //route specific middleware admin check

// app.get("/admin",checkAdmin,(req,res)=>{
//     res.send("Welcome Admin");
// });

// app.listen(8000,()=>{
//     console.log("Server is running on port 8000");  
// });

// //Syntax
// const bcrypt = require("bcrypt");
// const password = "123456";
// const hashedPassword = await bcrypt.hash(password, 10);
// console.log(hashedPassword);

// //Compare password
// const isMatch = await bcrypt.compare("123456", hashedPassword);
// console.log(isMatch); // true

// //Salt
// userSchema.pre("save", async function(next){
//     if(!this.isModified("password")){
//         return next();
//     const salt = await bcrypt.genSalt(10);  
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//     }
// });

// //login api
// app.post("/login", async (req, res) => {    
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(400).json({ error: "Invalid email or password" });
//     }   
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return res.status(400).json({ error: "Invalid email or password" });
//     }
//     res.json({ message: "Login successful" });
// });

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');~

mongoose
.connect("mongodb://localhost:27017/authDB")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Mongo Error",err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);    

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
});

app.post("/login",async (req,res) =>{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    res.json({message:"Login successful"});

})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});