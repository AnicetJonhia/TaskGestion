import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const TaskCard = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { type: 'TASK', id: task._id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const getPriorityClass = (priority) => {
        switch (priority.toLowerCase()) {
            case 'low':
                return 'border-primary';
            case 'medium':
                return 'border-success';
            case 'high':
                return 'border-danger';
            default:
                return '';
        }
    };

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Card className={`mb-2 ${getPriorityClass(task.priority)}`}>
                <CardBody>
                    <CardTitle>{task.title}</CardTitle>
                    <CardText>Priority: {task.priority}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default TaskCard;
