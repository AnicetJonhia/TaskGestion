import React from 'react';
import Sidebar from './jsx/Sidebar';
import MainContent from './jsx/MainContent';
import {Outlet} from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex">
        <Sidebar/>
        <MainContent>
            <Outlet />
        </MainContent>
    </div>
  );
};

export default Home;
