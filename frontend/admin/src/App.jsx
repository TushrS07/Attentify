import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./Pages/Home"; // Uncomment when you need a home page
import AdminPage from "./Pages/AdminPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
