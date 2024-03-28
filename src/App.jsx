import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import "./App.scss";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import BookingPage from "./pages/BookingPage/BookingPage";
// import ParkingDuration from "./components/PageDuration/ParkingDuration";

function App() {
  return (
    <div className="App">
      {/* Setup Browser routes */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/booking" element={<BookingPage />}></Route>
          {/* <Route path="/parking" element={<ParkingDurationPage />}></Route> */}

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
