const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/cookieDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const preferenceSchema = new mongoose.Schema({
    username: String,
    theme: String,
    language: String
});

const Preference = mongoose.model("Preference", preferenceSchema);

app.get("/set-cookie",(req,res)=>{
    res.cookie("username","ekta",{
        maxAge:24*60*60*1000,
        httpOnly: true,
    });
    res.send("cookies has been set");
});

app.get("/get-cookie",(req,res)=>{
    const user = req.cookies.username;
    if(user){
        res.send(`hello ${user}`);
    }
    else{
        res.send("no cookies found");
    }
});

app.get("/delete-cookie",(req,res)=>{
    res.clearCookie("username");
    res.send("cookie deleted");
});

app.post("/set-preference", async (req,res)=>{
    const { username, theme, language } = req.body;

    const data = {
        theme: theme || "light",
        language: language || "en",
    };

    try {
        await Preference.create({
            username,
            ...data
        });

        res.cookie("preferences", JSON.stringify(data),{
            maxAge: 7*24*60*60*1000
        });

        res.json({message: "preferences saved", data});
    } catch (err) {
        res.status(500).json({ message: "Error saving preferences" });
    }
});

app.get("/get-preference", (req,res)=>{
    const pref = req.cookies.preferences;

    if(!pref){
        return res.send("no preference found");
    }

    const parsed = JSON.parse(pref);
    res.json(parsed);
});

app.listen(3000, ()=>{
    console.log("server started");
});