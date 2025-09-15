
import React, { useRef, useState } from 'react'
import { CiStar } from "react-icons/ci";
import "../Css/Review.css"
import axios from 'axios';
const Review = () => {
  const [Rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const textfocus = useRef();

  // Handle star click
  const handleStarRating = (index) => {
    setRating(index + 1); // sets rating from 1–5
  };

  // Handle review submission
  const handleTextSubmit = async() => {
    if (!text.trim() || Rating === 0) {
      alert("Please add text and select a rating!");
      textfocus.current.focus(); // focus input if invalid
      return;
    }
    console.log("⭐ Submitted Review:");
    console.log("Rating:", Rating);
    console.log("Text:", text);

    // Reset after submit
    setText("");
    setRating(0);
  };

  return (
    <div className='ReviewParent' style={{ padding: "20px", maxWidth: "400px" }}>
      <div className='StarRating' style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <CiStar
            key={index}
            onClick={() => handleStarRating(index)}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              color: Rating > index ? "gold" : "gray" // highlight stars
            }}
          />
        ))}
      </div>

      <div className='TextReview' style={{ display: "flex", gap: "10px" }}>
        <input
          type='text'
          placeholder='Write your review...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={textfocus}
          style={{ flex: 1, padding: "5px" }}
        />
        <button type='submit' onClick={handleTextSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Review;
