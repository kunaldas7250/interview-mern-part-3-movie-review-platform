
import sql from "mssql";
import connection from "../Database/Db.js";   // ✅ include .js and match exact case


import multer from "multer";
import express from "express";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

const secret_key = "kunal_das";
// 🔑 JWT Verification Middleware
 const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.user_token || req.headers["authorization"];

    if (!token) {
      return res.status(401).send("⚠️ Access Denied. No token provided");
    }

    // If token comes with "Bearer <token>"
    const extractedToken = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

    jwt.verify(extractedToken, secret_key, (err, decoded) => {
      if (err) {
        return res.status(403).send("❌ Invalid or expired token");
      }
      req.user = decoded; // store user info in request
      next();
    });
  } catch (error) {
    console.error("❌ Token verification failed:", error);
    res.status(500).send("Internal Server Error");
  }
};
// Multer Error Handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send("❌ File too large! Max size is 2 MB");
    }
    return res.status(400).send(`❌ Multer error: ${err.message}`);
  } else if (err) {
    return res.status(400).send(`❌ Error: ${err.message}`);
  }
  next();
});

// ✅ Register User
app.post("/user/register", upload.single("fileImage"), async (req, res) => {
  try {
    const { username, Email, Password } = req.body;
    if (!username || !Email || !Password) {
      return res.status(400).send("⚠️ All fields required");
    }

    const hashpassword = await bcrypt.hash(Password, 10);

    const profilePic = req.file ? req.file.filename : null;

    const pool = await connection();
    await pool.request()
      .input("Username", sql.VarChar, username)
      .input("Email", sql.VarChar, Email)
      .input("Password", sql.VarChar, hashpassword)
      .input("ProfilePicture", sql.VarChar, profilePic)
      .query(`INSERT INTO Users (Username, Email, Password, ProfilePicture)
              VALUES (@Username, @Email, @Password, @ProfilePicture)`);

    res.status(201).send("✅ User registered successfully");
  } catch (error) {
    console.error("❌ Error in register:", error);
    res.status(500).send("Internal server error");
  }
});

// ✅ Login User
app.post("/user/login", async (req, res) => {
  try {
    const { username, Password,Email } = req.body;
    if (!username || !Password || !Email) {
      return res.status(400).send("⚠️ Username & Password required");
    }

    const pool = await connection();
    const result = await pool.request()
      .input("Username", sql.VarChar, username)
      .query("SELECT * FROM dbo.Users WHERE Username = @Username");

    if (result.recordset.length === 0) {
      return res.status(404).send("❌ User not found");
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(401).send("❌ Invalid password");
    }

    const token = jwt.sign({ userId: user.UserId, username: user.Username ,Email:user.Email}, secret_key, { expiresIn: "1d" });

    res.cookie("user_token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).send("✅ Login successful");
  } catch (error) {
    console.error("❌ Error in login:", error);
    res.status(500).send("Internal server error");
  }
});
export default app;
export { verifyToken };


