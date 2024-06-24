import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardBody, CardTitle } from 'reactstrap';
import LinearProgress from '@mui/material/LinearProgress';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskCard = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { type: 'TASK', id: task._id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

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

    const actions = [
        { icon: <EditIcon />, name: 'Edit' },
        { icon: <DeleteIcon />, name: 'Delete' }
    ];

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, position: 'relative' }}>
            <Card className={`mb-1 border-${getPriorityColor(task.priority)}`}>
                <CardBody>
                    <CardTitle>{task.title}</CardTitle>
                    <LinearProgress variant="bar" color={getPriorityColor(task.priority)} />
                    <SpeedDial
                        ariaLabel="Actions"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon />}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={() => handleActionClick(action.name)}
                            />
                        ))}
                    </SpeedDial>
                </CardBody>
            </Card>
        </div>
    );
};

export default TaskCard;
