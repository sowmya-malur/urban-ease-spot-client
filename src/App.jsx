// Import libraries
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Import styling
import "./App.scss";

// Import components and pages
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import NotifyPage from "./pages/NotifyPage/NotifyPage";

/**
 * The main component, responsible for routing and rendering components
 * @returns {JSX.Element} The JSX element representing the entire application.
 */
function App() {
  // Initialize state variables
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" || false
  );
  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route
            path="/"
            element={<HomePage setIsLoggedIn={setIsLoggedIn}/>}
          ></Route>
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>}
          ></Route>
          <Route
            path="/booking"
            element={<BookingPage setIsLoggedIn={setIsLoggedIn}/>}
          ></Route>
          <Route
            path="/notification"
            element={<NotifyPage setIsLoggedIn={setIsLoggedIn}/>}
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
