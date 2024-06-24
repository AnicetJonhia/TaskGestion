import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardBody, CardTitle } from 'reactstrap';
import LinearProgress from '@mui/material/LinearProgress';


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

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Card className={`mb-1 border-${getPriorityColor(task.priority)}`}>
                <CardBody>
                    <CardTitle>{task.title}</CardTitle>
                    <LinearProgress  variant="bar"  color={getPriorityColor(task.priority)} />
                </CardBody>
            </Card>
        </div>
    );
};

export default TaskCard;
