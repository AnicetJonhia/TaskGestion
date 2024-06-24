import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardBody, CardTitle, Col } from 'reactstrap';
import LinearProgress from '@mui/material/LinearProgress';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { deleteTask } from '../../services/api'; // Assurez-vous d'importer correctement votre fonction deleteTask

const TaskCard = ({ task, onDelete }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { type: 'TASK', id: task._id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' ou 'error'

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'low':
                return 'primary';
            case 'medium':
                return 'success';
            case 'high':
                return 'error';
            default:
                return 'primary'; // Default color if priority doesn't match
        }
    };

    const handleDeleteClick = async () => {
        try {
            const message = await deleteTask(task._id);
            setSnackbarMessage(message);
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            onDelete(task._id); // Appel d'une fonction parente pour mettre à jour l'état des tâches après la suppression
        } catch (error) {
            setSnackbarMessage('Failed to delete task');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            console.error('Failed to delete task:', error);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const actions = [
        { icon: <EditIcon />, name: 'Edit' },
        { icon: <DeleteIcon />, name: 'Delete', onClick: handleDeleteClick } // Ajout du gestionnaire d'événement onClick pour la suppression
    ];

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, position: 'relative' }}>
            <Card className={`mb-1 border-${getPriorityColor(task.priority)}`}>
                <CardBody>
                    <Col xs={8}>
                        <CardTitle>{task.title}</CardTitle>
                        <LinearProgress variant="bar" color={getPriorityColor(task.priority)} />
                    </Col>
                    <Col xs={4} className="text-end">
                        <SpeedDial
                            ariaLabel="Actions"
                            sx={{
                                position: 'absolute',
                                bottom: 24,
                                right: 5,
                                '& .MuiSpeedDial-fab': {
                                    width: '32px',
                                    height: '32px',
                                },
                            }}
                            icon={<SpeedDialIcon />}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    onClick={action.onClick} // Utilisation du gestionnaire d'événement onClick défini pour l'icône de suppression
                                />
                            ))}
                        </SpeedDial>
                    </Col>
                </CardBody>
            </Card>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <SnackbarContent
                    sx={{
                        backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red', // Choisir la couleur en fonction de la gravité
                    }}
                    message={snackbarMessage}
                    action={
                        <React.Fragment>
                            {/* Vous pouvez ajouter un bouton "Undo" ou "Close" ici si nécessaire */}
                        </React.Fragment>
                    }
                    onClose={handleCloseSnackbar}
                />
            </Snackbar>
        </div>
    );
};

export default TaskCard;
