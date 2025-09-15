import React, { useState } from "react";
import "../Css/NavHome.css"; // import CSS file
import Movie from "./Movie";
import { useNavigate } from "react-router-dom";

const NavHome = () => {
  const [isshow, setisshow] = useState(false);
const navigate = useNavigate();
  const handleprofile = () => {
    setisshow((prev) => !prev);
  };
const handlesearch=()=>{
    navigate("/Search")
}
const handleReview=()=>{
    navigate("/MovieReview")
}
const handleprofilereview=()=>{
    navigate("/ProfileReview")
}
  return (
    <>
    <div className="NavHome">
      {/* Left side text/logo */}
      <div className="Text">
        <p>Kunal Das</p>
      </div>

      {/* Filtering menu */}
      <div className="Filtering">
        <ul>
          <li onClick={handlesearch}>Search</li>
          <li onClick={handleprofilereview}>Profile Review</li>
          <li onClick={handleReview}>Review</li>
          <li>Rating</li>
        </ul>
      </div>

      {/* Profile + Logout */}
      <div className="ProfileSection">
        <div className="Profile">
          <button onClick={handleprofile}>Profile</button>

          {isshow && (
            <div className="ProfileDropdown">
              <p><strong>Username:</strong> Kunal</p>
              <p><strong>Email:</strong> kunal@example.com</p>
              <p><strong>Password:</strong> ********</p>
            </div>
          )}
        </div>

        <div className="Logout">
          <button>Logout</button>
        </div>
      </div>
    </div>
    <Movie/>
    </>
  );
};

export default NavHome;
