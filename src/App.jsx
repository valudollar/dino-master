import { useState, useEffect } from "react";
import "normalize.css";
import "./App.css";
import Quiz from "./Quiz";
import Result from "./Result";
import Setting from "./Setting";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      {/* <Quiz /> */}
    </>
  );
}

export default App;
