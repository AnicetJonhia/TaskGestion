import React from 'react';

import Logout from "../Auth/Logout";
import Sidebar from './Sidebar';
const Home = () => {
  return (

          <div className={"d-flex"}>
              <Sidebar />
              <Logout/>
          </div>

  );
};

export default Home;
