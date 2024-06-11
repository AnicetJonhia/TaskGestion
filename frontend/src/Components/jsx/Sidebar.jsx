import React, { useState } from 'react';
import Logo from "../../assets/images/Logo.png"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Modal, ModalBody} from "reactstrap";


const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  const toggleModal = () => setIsOpen(!isOpen);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      localStorage.removeItem('token');
      setSuccess("Logout successful");
      toggleModal();
      setTimeout(() => {
        navigate('/login');
        setIsOpen(false);
      }, 1000)
    } catch (error) {
       if(error.response && error.response.data) {
         setError(error.response.data || 'Login failed');
       }
       else {
         setError('Login failed');
       }
    }
  };

  return (
      <>
      <aside id="sidebar" className={isExpanded ? '' : 'expand'}>
        <div className="d-flex">
          <div className="sidebar-logo ms-2 d-block">
            <img
                src={Logo} alt="Logo"
                className="img-fluid rounded sidebar-logo"
                style={{ width: '50px', height: '50px', marginRight: '10px' }}
            />
            <span className="sidebar-logo">TaskGestion</span>
          </div>
          <button className="toggle-btn" type="button" onClick={handleToggle}>
            <i className="lni lni-grid-alt"></i>
          </button>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/home/dashboard"  className="sidebar-link">
              <i  className="lni lni-home"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to={"/home/task"} className="sidebar-link">
              <i className="lni lni-agenda"></i>
              <span>Task</span>
            </Link>
          </li>


          <li className="sidebar-item">
            <Link to={"/home/notification"} className="sidebar-link">
              <i className="lni lni-popup"></i>
              <span>Notification</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to={"/home/setting"} className="sidebar-link">
              <i className="lni lni-cog"></i>
              <span>Setting</span>
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Link to={"#logout"}  onClick={handleLogout} className="sidebar-link">
            <i className="lni lni-exit"></i>
            <span>Logout</span>
          </Link>
        </div>
      </aside>
          {/* Modal pour afficher les erreurs et le succès */}
          <Modal isOpen={isOpen} toggle={toggleModal}>
            <ModalBody>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {!error && success && <p style={{ color: 'green' }}>{success}</p>}
            </ModalBody>
          </Modal>

      </>
  );
};

export default Sidebar;
