const express = require("express");
const app = express();

// Types of Middleware

//Application-level Middleware - Middleware which is executed for every request to the server. 
// It can be used for tasks like logging, authentication, etc.

// app.use((req,res, next) => {
//     console.log("Request URL: ", req.url);
//     console.log("Request Method: ", req.method);
//     next();
// });

// app.get("/home", (req,res) =>{
//     res.send("Welcome to Home Page");
// });





//Built-in Middleware - Middleware which is provided by express framework. 
// It can be used for tasks like parsing json data, parsing form data, etc.

// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // form data parsing middleware

// app.use((req, res, next) =>{
//     console.log("Request URL: ", req.url);
//     console.log("Request Method: ", req.method);
//     next();
// })

// app.get("/home", (req,res) =>{
//     res.send("Welcome to Home Page");
// });




//Router - level Middleware - Middleware which is executed for specific routes.
// It can be used for tasks like authentication, authorization, etc. for specific routes.

// const checkLogin=((req,res,next) =>{
//     const isLoggedin = true;
//     if(!isLoggedin){
//         return res.status(401).send("Please Login first");
//     }
//     next();
// });
// app.get("/dashboard", checkLogin, (req,res) =>{
//     res.send("Welcome to Dashboard");
// });




//Authentication Middleware - Middleware which is used for authentication purpose. 
// It can be used to check if the user is authenticated or not before allowing access to certain routes.

// const authMiddleware = (req,res,next) =>{
//     const token = req.headers.authorization; // get token from request headers
//     if(!token){
//         return res.status(403).json({ message: "Token Required" });
//     }
//     if(token !== "akku"){ //my secret token
//         return res.status(401).json({ message: "Invalid Token" });
//     }
//     next();
// };
// app.get("/profile", authMiddleware, (req,res) =>{
//     res.json({ message: "Profile Data" });
// });



//Error - handling Middleware - Middleware which is used for handling errors in the application.
// It can be used to catch errors and send appropriate response to the client.

// app.get("/error", (req,res) =>{
//     throw new Error("Something went wrong");
// });

// app.use((err, req, res, next) =>{
//     console.log("Error Middleware", err.message);
//     res.status(500).json({
//         message: "Internal Server Error" 
//     });
// });



//Third-party Middleware - Middleware which is provided by third-party libraries.
// It can be used for tasks like logging, authentication, etc. provided by third-party libraries.
//CORS=CORS-ORIGIN RESOURCE SHARING

const cors = require("cors");
app.use(cors()); // Enable CORS for all routes

app.get("/data", (req,res) =>{
    res.json({ message: "Cors working"});
});
//Specific Frontend allow
app.use(
    cors({
        origin:"http://localhost:5173" // allow only this frontend to access the server
    })
);

//multiple allow
const allowedOrigins = [
    "http://localhost:5173", 
    "http://localhost:3000"
];
app.use(
    cors({
        origin: allowedOrigins,
    })
);


app.listen(8000,() => console.log("Server Started"));
