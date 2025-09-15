import React, { useState } from 'react';
import axios from 'axios';
import "../Css/Search.css";
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [number, setNumber] = useState("");
  const [movies, setMovies] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const navigate = useNavigate(); // ✅ Correct usage

  const handleSearch = async () => {
    try {
      // If route is /movies/:id
      const response = await axios.get(`http://localhost:4000/movies/${number}`);

      // If backend expects query param /movies?id=123, use this instead:
      // const response = await axios.get("http://localhost:4000/movies", { params: { id: number } });

      setMovies(Array.isArray(response.data) ? response.data : [response.data]);
      setIsShow(true);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    }
  };

  const handleAdd = () => {
    navigate("/Addmovie");
  };

  return (
    <div className="SearchParent">
      <nav className="AddMovie">
        <button onClick={handleAdd}>Add Movie</button>
      </nav>

      <div className="Search">
        <input
          type="number"
          placeholder="Search A Movie"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {isShow && (
          <div className="Movies">
            {movies.map((item, index) => (
              <div className="Movie-Details" key={index}>
                <p><strong>Title:</strong> {item.Title}</p>
                <p><strong>Genre:</strong> {item.Genre}</p>
                <p><strong>Year:</strong> {item.ReleaseYear}</p>
                <p><strong>Director:</strong> {item.Director}</p>
                <p><strong>Cast:</strong> {item.Cast}</p>
                <p><strong>Synopsis:</strong> {item.Synopsis}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
