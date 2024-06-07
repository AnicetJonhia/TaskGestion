import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />


      </Routes>
    </Router>
  );
}

export default App;
