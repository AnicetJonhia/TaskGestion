import React from 'react';
import Navbar from './Navbar'
const MainContent = ({children}) => {
    return(
        <div className="main">
            <Navbar/>
            <div className="p-3">
                {children}
            </div>
        </div>
    )
}


export default MainContent;