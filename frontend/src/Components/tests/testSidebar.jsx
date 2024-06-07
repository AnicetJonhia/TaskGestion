import React from 'react';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

const Sidebar = () => {
  return (
    <>
      <Navbar color="light" light expand="md" className="no-margin">
        <NavbarBrand href="#">
          <i className="fa fa-rocket fa-4"></i>TaskGestion
        </NavbarBrand>
        <Button color="link" id="menu-toggle" className="navbar-toggler" onClick={() => document.getElementById('menu-toggle').click()}>
          <span className="navbar-toggler-icon"></span>
        </Button>
      </Navbar>
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <Nav vertical pills stacked id="menu">
            <NavItem>
              <NavLink href="#">
                <span className="fa-stack fa-lg pull-left"><i className="fa fa-dashboard fa-stack-1x "></i></span> Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <span className="fa-stack fa-lg pull-left"><i className="fa fa-flag fa-stack-1x "></i></span>Shortcut
              </NavLink>
              <Collapse isOpen={false}>
                <Nav vertical pills stacked>
                  <NavItem>
                    <NavLink href="#">
                      <span className="fa-stack fa-lg pull-left"><i className="fa fa-flag fa-stack-1x "></i></span>link1
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <span className="fa-stack fa-lg pull-left"><i className="fa fa-flag fa-stack-1x "></i></span>link2
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <span className="fa-stack fa-lg pull-left"><i className="fa fa-cloud-download fa-stack-1x "></i></span>Overview
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <span className="fa-stack fa-lg pull-left"><i className="fa fa-cart-plus fa-stack-1x "></i></span>Events
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <span className="fa-stack fa-lg pull-left"><i className="fa fa-youtube-play fa-stack-1x "></i></span>About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <span className="fa-stack fa-lg pull-left"><i className="fa fa-wrench fa-stack-1x "></i></span>Services
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <span className="fa-stack fa-lg pull-left"><i className="fa fa-server fa-stack-1x "></i></span>Contact
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid xyz">
            <div className="row">
              <div className="col-lg-12">
                <h1>Simple Admin Sidebar With Bootstrap by <a href="http://http://codepen.io/hughbalboa/">@hughbalboa</a></h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident laudantium nobis cum dignissimos ex inventore, velit blanditiis. Quod laborum soluta quidem culpa officia eligendi, quam, recusandae iste aliquid amet odit! </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
