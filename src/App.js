import "./App.css";
import Player from "./Player/Player";
import { songsdata } from "./Player/audios";
import { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Verify from "./components/Verify";
import Login from "./components/Login";
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verify/:phoneNumber/:requestId/" element={<Verify />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
