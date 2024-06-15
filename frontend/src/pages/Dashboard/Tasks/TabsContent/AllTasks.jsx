import React from 'react';
import { Card, Typography, Avatar } from '@mui/material';
import { Row, Col } from 'reactstrap';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

// Fonction pour formater la date
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Fonction pour obtenir la couleur de l'avatar en fonction du statut
const getAvatarColor = (status) => {
    switch (status) {
        case 'Todo':
            return '#007bff'; // primary color
        case 'In progress':
            return '#17a2b8'; // info color
        case 'Completed':
            return '28a745'; // success color
        default:
            return '#000000'; // default color
    }
};

const AllTasks = ({ project }) => {
    return (
        <Card variant="outlined" sx={{ padding: 2, mb: 2, boxShadow:4 }}>
            <Row className="align-items-center">
                <Col xs="12" sm="auto" className="text-center mb-3 mb-sm-0">
                    <Avatar sx={{ bgcolor: project.avatarColor }}>
                        {project.avatar}
                    </Avatar>
                </Col>
                <Col xs="12" sm className="text-sm-left mb-3 mb-sm-0">
                    <Typography variant="h6">{project.title}</Typography>
                </Col>
                <Col xs="12" sm className="mb-3 mb-sm-0 d-flex align-items-center">
                    <DragIndicatorIcon fontSize="small" style={{color:getAvatarColor(project.status)}} sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {project.category}
                    </Typography>
                </Col>
                <Col xs="12" sm className="mb-3 mb-sm-0 d-flex align-items-center">
                    <DescriptionRoundedIcon fontSize="small" style={{color:getAvatarColor(project.status)}} sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {project.description}
                    </Typography>
                </Col>
                <Col xs="12" sm className="mb-3 mb-sm-0 d-flex align-items-center">
                    <TaskAltIcon fontSize="small" style={{color:getAvatarColor(project.status)}} sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(project.dueDate)}
                    </Typography>
                </Col>
                <Col xs="12" sm="auto" className="mb-3 mb-sm-0 d-flex align-items-center">
                    <MilitaryTechRoundedIcon fontSize="small" style={{ color: getAvatarColor(project.status), marginRight: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {project.status}
                    </Typography>
                </Col>
            </Row>
        </Card>
    );
};

export default AllTasks;
