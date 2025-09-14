import React from 'react'
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import Movie from "./Movie"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const Allroutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Home/> */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/Movie' element={<Movie/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Allroutes
