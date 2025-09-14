import React from 'react'
import Img from "../Home Image/Home.jpeg"
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import "../Css/Home.css"
const Home = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/login")
  }

  const handleRegister = () => {
    navigate("/register")
  }

  return (
    <motion.div 
      className='HomeParent'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className='HomeImg'>
        <motion.img 
          src={Img} 
          alt='pic not found' 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <motion.div className='LoginRegister'>
        <motion.button 
          onClick={handleLogin}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>

        <motion.button 
          onClick={handleRegister}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default Home
