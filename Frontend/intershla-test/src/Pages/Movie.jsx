
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../Css/Movie.css";

const Movie = () => {
  const [moviedata, setmoviedata] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:4000/movies", {
          withCredentials: true,
        });
        setmoviedata(response.data);
      } catch (error) {
        console.error(
          `Something went wrong: ${error.response?.data || error.message}`
        );
      }
    };
    fetchMovies();
  }, []);

  
  const trendingMovies = moviedata.filter((item) => {
    const year = Number(item.ReleaseYear || item.releaseYear);
    console.log(year)
    return year === 2021 || year===2022;
  });

  const containerVariant = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="MoviesParent"
      variants={containerVariant}
      initial="hidden"
      animate="show"
    >
      
      <motion.div className="trending-Movie">
        <h2>🔥 Trending Movies</h2>
        {trendingMovies.length === 0 && <p>No trending movies found</p>}
        <div className="Trending-Scroll">
          {trendingMovies.map((item, index) => (
            <motion.div
              key={index}
              className="Trending-Card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p><strong>Title:</strong> {item.Title}</p>
              <p><strong>Genre:</strong> {item.Genre}</p>
              <p><strong>Director:</strong> {item.Director}</p>
              <p><strong>Cast:</strong> {item.Cast}</p>
              <p><strong>Year:</strong> {item.ReleaseYear}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      
      {moviedata.length > 0 && (
        <motion.div className="GetAllMovies">
          <h2>🎬 All Movies</h2>
          <div className="Movie">
            {moviedata.map((item, index) => (
              <motion.div
                key={index}
                className="Movie-Card"
                variants={cardVariant}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="Movie-Details">
                  <p><strong>Title:</strong> {item.Title}</p>
                  <p><strong>Genre:</strong> {item.Genre}</p>
                  <p><strong>Year:</strong> {item.ReleaseYear}</p>
                  <p><strong>Director:</strong> {item.Director}</p>
                  <p><strong>Cast:</strong> {item.Cast}</p>
                  <p><strong>Synopsis:</strong> {item.Synopsis}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Movie;
