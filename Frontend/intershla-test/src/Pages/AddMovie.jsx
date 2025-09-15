import axios from "axios";
import React, { useState } from "react";
import "../Css/AddMovie.css"
const AddMovie = () => {
  const [Title, setTitle] = useState("");
  const [Genre, setGenre] = useState("");
  const [ReleaseYear, setReleaseYear] = useState("");
  const [Director, setDirector] = useState("");
  const [Cast, setCast] = useState("");
  const [Synopsis, setSynopsis] = useState("");
  const [AverageRataing, setAverageRataing] = useState("");
  const [MoviePoster, setMoviePoster] = useState(null);


//     e.preventDefault();
//     try {
//       const formdata = new FormData();
//       formdata.append("Title", Title);
//       formdata.append("Genre", Genre);
//       formdata.append("ReleaseYear", ReleaseYear);
//       formdata.append("Director", Director);
//       formdata.append("Cast", Cast);
//       formdata.append("Synopsis", Synopsis);
//       formdata.append("AverageRataing", AverageRataing);
//       if (MoviePoster) {
//         formdata.append("MoviePoster", MoviePoster);
//       }

//       const response = await axios.post("http://localhost:4000/movies", formdata, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log(response.data);
//     } catch (error) {
//       console.error(`Something went wrong: ${error}`);
//     }
//   };
const handlesubmit = async (e) => {
  e.preventDefault();
  try {
    const formdata = new FormData();
    formdata.append("Title", Title);
    formdata.append("Genre", Genre);
    formdata.append("ReleaseYear", ReleaseYear);
    formdata.append("Director", Director);
    formdata.append("Cast", Cast);
    formdata.append("Synopsis", Synopsis);
    formdata.append("AverageRataing", AverageRataing);
    if (MoviePoster) formdata.append("MoviePoster", MoviePoster);



    const response = await axios.post("http://localhost:4000/movies", formdata, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    console.log("Movie added:", response.data);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
};

  return (
    <div className="Addmovie">
      <form onSubmit={handlesubmit}>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Enter your Movie Title"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Genre:</label>
        <input
          type="text"
          placeholder="Enter your Genre"
          value={Genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <label>Release Year:</label>
        <input
          type="number"
          placeholder="Enter Release Year"
          value={ReleaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />

        <label>Director:</label>
        <input
          type="text"
          placeholder="Enter Director"
          value={Director}
          onChange={(e) => setDirector(e.target.value)}
        />

        <label>Cast:</label>
        <input
          type="text"
          placeholder="Enter Cast"
          value={Cast}
          onChange={(e) => setCast(e.target.value)}
        />

        <label>Synopsis:</label>
        <input
          type="text"
          placeholder="Enter Synopsis"
          value={Synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        />

        <label>Average Rating:</label>
        <input
          type="number"
          placeholder="Enter Average Rating"
          value={AverageRataing}
          onChange={(e) => setAverageRataing(e.target.value)}
        />

        <label>Poster:</label>
        <input
          type="file"
          onChange={(e) => setMoviePoster(e.target.files[0])}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddMovie;
