import React, { useState } from 'react'
import { motion } from "framer-motion"
import "../Css/Register.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [Username, setUsername] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [ProfilePicture, setProfilePicture] = useState(null)

  const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       // create FormData to handle file upload
//       const formData = new FormData()
//       formData.append("Username", Username)
//       formData.append("Email", Email)
//       formData.append("Password", Password)
//       formData.append("fileImage", ProfilePicture);


//       const response = await axios.post("http://localhost:4000/user/register", formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       })

//       console.log(response.data)
//       navigate("/login")
//     } catch (error) {
//       console.error("Something went wrong:", error)
//     }
//   }
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("username", Username); // backend expects 'username'
    formData.append("Email", Email);
    formData.append("Password", Password);
    if (ProfilePicture) formData.append("fileImage", ProfilePicture); // match backend

    const response = await axios.post(
      "http://localhost:4000/user/register",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log(response.data);
    navigate("/login");
  } catch (error) {
    console.error("Something went wrong:", error);
  }
};


  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="registerForm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="formGroup">
        <label>Username:</label>
        <motion.input 
          type='text' 
          placeholder='Enter your Username' 
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label>Email:</label>
        <motion.input 
          type='email' 
          placeholder='Enter your Email'
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label>Password:</label>
        <motion.input 
          type='password' 
          placeholder='Enter your Password'
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label>Profile Picture:</label>
        <motion.input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} name="fileImage" />
      </div>

      <motion.button 
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Register
      </motion.button>
    </motion.form>
  )
}

export default Register
