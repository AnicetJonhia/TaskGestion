import React, { useEffect } from 'react';
import { Dropdown, initMDB } from "mdb-ui-kit";  // Import MDB UI Kit components
import Search from './Navbar/Search'
import User from './Navbar/User';

const Navbar = () => {
  useEffect(() => {
    initMDB({ Dropdown });  // Initialize MDB UI Kit components
  }, []);

  return (
    <nav  className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
       <Search/>
        <User/>
      </div>
    </nav>
  );
};

export default Navbar;
