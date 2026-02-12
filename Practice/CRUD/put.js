//import express from "express";
const express = require("express");
const app=express();
app.use(express.json());

let cred=[
    {email:"raj@gmail.com",password:"123"},
    {email:"erica@gmail.com",password:"456"},
]

//GET request
app.get("auth/users",(req,res)=>{
    res.json({message : "User fetch successfull",cred});
})

// Reset passowrd route
// Put request

app.put("auth/reset" , (req, res) => {
  const {email,password, newPassword}=req.body;
  const user=cred.find((credd)=>credd.email===email);
  if(!user){
    return res.status(404).json({message:"Invalis email"});
  }
  if(user.password!==password){
    return res.status(401).json({message:"Invalid password"});
  }
  //Update password
  user.password=newPassword;
  res.json({message:"Password reset successfully",users});
}) 


//Forgot password route
app.put("/auth/forget",(req,res)=>{
    const {email,newPassword}=req.body;
    const user=cred.find((credd) => credd.email==email);

  if(!user){
    return res.status(404).json({message:"Invalis email"});
  }
  // forgot password
  user.password=newPassword;
  res.json({message:"Password forgot successfully",users});
        
   
})

// Update email route
app.put("/auth/update-email", (req, res) => {
  const {email, password, newEmail} = req.body;
    const user = cred.find((credd) => credd.email === email);
    if (!user) {
    return res.status(404).json({message: "Invalid email"});
    }
    if (user.password !== password) {
    return res.status(401).json({message: "Invalid password"});
    }
    // Update email
    user.email = newEmail;
    res.json({message: "Email updated successfully", user});
});

app.listen(8000,()=> console.table("Server started"));