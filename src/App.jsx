import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import "./App.scss";

// Import components and pages
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import NotifyPage from "./pages/NotifyPage/NotifyPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" || false
  );

  const [userId, setUserId] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}/>
        <Routes>
          <Route
            path="/"
            element={<HomePage setIsLoggedIn={setIsLoggedIn} userId={userId}/>}
          ></Route>
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}/>}
          ></Route>
          <Route
            path="/booking/:userId"
            element={<BookingPage setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}/>}
          ></Route>
          <Route
            path="/notification/:userId"
            element={<NotifyPage setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}/>}
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
