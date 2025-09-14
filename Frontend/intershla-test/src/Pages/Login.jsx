import React, { useState } from 'react';
import { motion } from "framer-motion";
import "../Css/Login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:4000/user/login",
      { username, Email, Password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true // 🔹 allow cookies to be sent by browser
      }
    );

    console.log("Login Success:", response.data);

    // Redirect to Movie page
    navigate("/Movie");
  } catch (error) {
    console.error("Something went wrong:", error.response?.data || error.message);
  }
};


  return (
    <motion.form
      onSubmit={handleSubmit}
      className="loginForm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="formGroup">
        <label>Username:</label>
        <motion.input 
          type="text" 
          placeholder="Enter your username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>

      <div className="formGroup">
        <label>Email:</label>
        <motion.input 
          type="email" 
          placeholder="Enter your email" 
          value={Email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>

      <div className="formGroup">
        <label>Password:</label>
        <motion.input 
          type="password" 
          placeholder="Enter your password" 
          value={Password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>

      <motion.button 
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Login
      </motion.button>
    </motion.form>
  );
};

export default Login;
