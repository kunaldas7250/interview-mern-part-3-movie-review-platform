// // Restfull api code
// import express from "express"
// const app=express()
// import cors from "cors"
// import cookie from "cookie-parser"
// import Login from "./Routes/Login&Register-Routes"

// import Routes from "./Routes/AllRoutes"
// import sql from "mssql"
// app.use(
//   cors({
//     origin: "http://localhost:5173/", // frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
//     credentials: true, // allow cookies
//   })
// );
// app.use(express.json())
// app.use(express.urlencoded({extended:false}))
// app.use(cookie)
// app.use(Routes)
// app.use(Login)
// app.listen(4000,()=>{
//     console.log("your port is running on :4000")
// })


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sql from "mssql";

import Login from "./Routes/LoginRegisterRoutes.js";  // ✅ add .js
import Routes from "./Routes/AllRoutes.js";             // ✅ add .js

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ remove trailing slash
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
     //allowedHeaders: ["Content-Type", "Authorization"]
  })
);
// res.cookie("token", token, {
//   httpOnly: true,
//   sameSite: "lax", // or "none" if cross-origin with HTTPS
//   secure: false    // true if using HTTPS
// });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(Routes);
app.use(Login);

app.listen(4000, () => {
  console.log("✅ Server running on port 4000");
});
