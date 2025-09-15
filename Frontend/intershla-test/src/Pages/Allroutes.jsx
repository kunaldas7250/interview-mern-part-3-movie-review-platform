import React from 'react'
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import Movie from "./Movie"
import Review from "./Review"
import NavHome from './NavHome'
import AddMovie from "./AddMovie";
import Search from "./Search"
import MovieReview from "./MovieReview"
import AddReview from "./AddReview"
import ProfileReview from "./ProfileReview"
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
        <Route path='/Review' element={<Review/>}/>
        <Route path='/NavHome' element={<NavHome/>}/>
        <Route path='/Search' element={<Search/>}/>
         <Route path="/Addmovie" element={<AddMovie />} />
         <Route path='/MovieReview' element={<MovieReview/>}/>
         <Route path='/AddReview' element={<AddReview/>}/>
         <Route path='/ProfileReview' element={<ProfileReview/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Allroutes
