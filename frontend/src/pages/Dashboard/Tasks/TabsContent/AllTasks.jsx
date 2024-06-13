import React from 'react';
import { Card, Typography, Avatar, Box, LinearProgress } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


const AllTasks = ({ project }) => {
    return (
        <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', padding: 2, mb: 2  }}>
            <Avatar sx={{ bgcolor: project.avatarColor, marginRight: 2 }}>
                {project.avatar}
            </Avatar>
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{project.name}</Typography>

            </Box>

            <Box sx={{ flex: 2 , display:"flex"}}>
                <DragIndicatorIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                    {project.category}
                </Typography>
            </Box>

            <Box sx={{ textAlign: 'right', ml: 2 }}>
                <Typography variant="body2" color="text.secondary">Progress</Typography>
                <Typography variant="body2" color="text.primary">{project.progress}%</Typography>
                <LinearProgress variant="determinate" value={project.progress} sx={{ width: 100, mt: 1 }} />
            </Box>
        </Card>
    );
}

export default AllTasks;
