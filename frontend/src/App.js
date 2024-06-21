 import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Home from "./Components/Home";
import Dashboard from"./pages/Dashboard"
import Task from "./pages/Task";
import Notification from "./pages/Notification";
import Setting from "./pages/Setting";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="task" element={<Task />} />
          <Route path="notification" element={<Notification />} />
          <Route path="setting" element={<Setting />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
