import { useState, useEffect } from "react";

import "./App.css";
import Quiz from "./Quiz";
import Result from "./Result";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      {/* <Quiz /> */}
    </>
  );
}

export default App;
