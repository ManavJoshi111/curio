import React from "react";
import "../styles/ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      {/* Error message and image container */}
      <div className="error-message-container">
        <h2>Oops! Looks like you're lost.</h2>
        <p>The page you're looking for couldn't be found.</p>
      </div>
      <div className="error-image-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdirsssQpphqaT8Y2H8RW41eGyEixAD-Z_VGaWr2LOS6bMbPmWqFk9EBr1oQibFy7V574&usqp=CAU"
          alt="Lost astronaut exploring space"
          className="error-image"
        />
      </div>
      <div className="error-navigation">
        <h3>Want to get back on track?</h3>
        <ul>
          <li>
            <a href="/">Go back to Home</a>
          </li>
        </ul>
      </div>
      <footer>
        <p>&copy; 2024 Curio</p>
      </footer>
    </div>
  );
};

export default ErrorPage;
