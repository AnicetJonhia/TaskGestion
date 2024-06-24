import React from 'react';
import { useDrop } from 'react-dnd';
import { Card, CardTitle, CardBody } from 'reactstrap';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onDrop }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => onDrop(item.id, title),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = canDrop && isOver;

    return (
        <div ref={drop} className="col-md-3 p-2">
            <Card className={`p-1 ${isActive ? 'bg-light' : ''}`}>
                <CardTitle className={"text-center"} tag="h5">{title}</CardTitle>
                <CardBody>
                    {tasks.map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))}
                </CardBody>
            </Card>
        </div>
    );
};

export default TaskColumn;
