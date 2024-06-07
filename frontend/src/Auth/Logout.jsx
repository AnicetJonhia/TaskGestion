import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      alert('Logout failed');
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
