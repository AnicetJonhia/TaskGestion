import React, { useEffect } from 'react';
import { Dropdown, initMDB } from "mdb-ui-kit";  // Import MDB UI Kit components
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import Font Awesome CSS
import 'mdb-ui-kit/css/mdb.min.css';  // Import MDB UI Kit CSS

const Navbar = () => {
  useEffect(() => {
    initMDB({ Dropdown });  // Initialize MDB UI Kit components
  }, []);

  return (
    <nav  className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <form className="d-flex input-group w-50">
          <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
          />
          <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search"></i>
          </span>
        </form>
       <ul className="navbar-nav">

      <li className="nav-item dropdown">
        <a
          data-mdb-dropdown-init
          className="nav-link dropdown-toggle d-flex align-items-center"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          aria-expanded="false"
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
            className="rounded-circle"
            height="22"
            loading="lazy"
          />
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li>
            <a className="dropdown-item" href="#">My profile</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Help</a>
          </li>

        </ul>
      </li>
    </ul>
      </div>
    </nav>
  );
};

export default Navbar;
