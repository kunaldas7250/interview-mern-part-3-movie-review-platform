import axios from "axios";
import React, { useState } from "react";
import "../Css/MovieReview.css"
import { useNavigate } from "react-router-dom";
const MovieReview = () => {
  const [MovieId, setMovieId] = useState("");
  const [isshow, setisshow] = useState(false);
  const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
  const handleReview = async () => {
    if (!MovieId) {
      alert("Please enter a Movie Id");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:4000/movies/${MovieId}/reviews`,{
            withCredentials: true
        }
      );

      // Normalize: if response is array, set it; else wrap in array
      const data = response.data;
      setMovies(Array.isArray(data) ? data : [data]);
      setisshow(true);
    } catch (error) {
      console.error("❌ Something went wrong:", error);
    }
  };
const handleAddReview=()=>{
navigate("/AddReview")
}
  return (
    <div className="MovieReviewParent">
        <div className="AddReview">
        <button onClick={handleAddReview}>Add Review</button>
      </div>

      <div className="MovieReviewSearch">
        <input
          type="number"
          placeholder="Search By Movie Id"
          value={MovieId}
          onChange={(e) => setMovieId(e.target.value)}
        />
        <button onClick={handleReview}>Submit</button>
      </div>

      {isshow && (
        <div className="Movies">
          {movies.length > 0 ? (
            movies.map((item, index) => (
              <div className="Movie-Details" key={index}>
                <p>
                  <strong>Title:</strong> {item.Title}
                </p>
                <p>
                  <strong>Genre:</strong> {item.Genre}
                </p>
                <p>
                  <strong>Year:</strong> {item.ReleaseYear}
                </p>
                <p>
                  <strong>Director:</strong> {item.Director}
                </p>
                <p>
                  <strong>Cast:</strong> {item.Cast}
                </p>
                <p>
                  <strong>Synopsis:</strong> {item.Synopsis}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews found for this movie.</p>
          )}
        </div>
      )}

      
    </div>
  );
};

export default MovieReview;
