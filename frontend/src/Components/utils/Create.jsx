import React from 'react';
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
const Create = () => {
    return(
        <Tooltip title="Add Tasks" placement="top-start">
            <Fab variant="extended" color="primary" aria-label="add">
              <AddIcon /> Create
            </Fab>
        </Tooltip>
        // <Fab color="secondary" aria-label="edit">
        //   <EditIcon />
        // </Fab>
        // <Fab variant="extended">
        //   <NavigationIcon sx={{ mr: 1 }} />
        //   Navigate
        // </Fab>
        // <Fab disabled aria-label="like">
        //   <FavoriteIcon />
        // </Fab>
    )
}

export  default  Create;