import React from 'react';

const MainContent = ({children}) => {
    return(
        <div className="main p-3">
            <div className="text-center">
                {children}
            </div>
        </div>
    )
}


export default MainContent;