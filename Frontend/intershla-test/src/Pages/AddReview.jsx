import axios from 'axios';
import React, { useState } from 'react';
import "../Css/AddReview.css"; 

const AddReview = () => {
  const [UserID, setUserID] = useState("");
  const [MovieID, setMovieID] = useState("");
  const [Rating, setRating] = useState("");
  const [ReviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/movies/:id/reviews`,
        {
          UserID,
          MovieID,
          Rating,
          ReviewText,
        }
      );
      console.log("✅ Review Added:", response.data);
      alert("Review submitted successfully!");
      
      // Reset form after success
      setUserID("");
      setMovieID("");
      setRating("");
      setReviewText("");
    } catch (error) {
      console.error("❌ Something went wrong:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="AddReview">
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input
          type="number"
          placeholder="Enter your UserID"
          value={UserID}
          onChange={(e) => setUserID(e.target.value)}
          required
        />

        <label>Movie ID:</label>
        <input
          type="number"
          placeholder="Enter Movie ID"
          value={MovieID}
          onChange={(e) => setMovieID(e.target.value)}
          required
        />

        <label>Rating:</label>
        <input
          type="number"
          placeholder="Enter your Movie Rating (1-5)"
          value={Rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />

        <label>Review Text:</label>
        <textarea
          placeholder="Write your review here..."
          value={ReviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        ></textarea>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
