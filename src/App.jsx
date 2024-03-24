import React from "react";
import Header from './components/Header/Header';
import HomePage from "./pages/HomePage/HomePage";
import './App.scss';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* Setup Browser routes */}
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
