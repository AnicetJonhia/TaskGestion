import React, { useState } from 'react';
import { Container, Row, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const initialTask = { id: 1, title: 'Task 1', priority: 'high' };

const ItemTypes = {
    TASK: 'TASK',
};

const TaskCard = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { type: ItemTypes.TASK, id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Card className={`mb-2 ${task.priority === 'high' ? 'border-danger' : task.priority === 'medium' ? 'border-warning' : 'border-success'}`}>
                <CardBody>
                    <CardTitle>{task.title}</CardTitle>
                    <CardText>Priority: {task.priority}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

const TaskColumn = React.forwardRef(({ title, tasks, onDrop, children }, ref) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => onDrop(item.id, title),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = canDrop && isOver;

    return (
        <div ref={drop} className="col-md-3 p-2">
            <Card className={`p-2 ${isActive ? 'bg-light' : ''}`}>
                <CardTitle tag="h5">{title}</CardTitle>
                <CardBody>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </CardBody>
                {children}
            </Card>
        </div>
    );
});

const TaskBoard = () => {
    const [taskList, setTaskList] = useState({
        Todo: [initialTask],
        InProgress: [],
        Completed: [],
        ForDelete: [],
    });

    const handleDrop = (taskId, column) => {
        setTaskList((prevTaskList) => {
            const task = Object.values(prevTaskList).flat().find(task => task.id === taskId);
            if (!task) return prevTaskList;

            const updatedTaskList = Object.fromEntries(
                Object.entries(prevTaskList).map(([key, tasks]) => [
                    key,
                    key === column ? [...tasks, { ...task, priority: getColumnPriority(column) }] : tasks.filter(task => task.id !== taskId)
                ])
            );

            return updatedTaskList;
        });
    };

    const getColumnPriority = (column) => {
        switch (column) {
            case 'Todo':
                return 'high';
            case 'InProgress':
                return 'medium';
            case 'Completed':
                return 'low';
            case 'ForDelete':
                return 'high'; // Assuming ForDelete has high priority
            default:
                return 'medium'; // Default case, should not happen ideally
        }
    };

    return (
        <Container fluid className="vh-100 d-flex flex-column">
            <Row className="flex-grow-1">
                <DndProvider backend={HTML5Backend}>
                    {Object.entries(taskList).map(([column, tasks]) => (
                        <TaskColumn key={column} title={column} tasks={tasks} onDrop={handleDrop} />
                    ))}
                </DndProvider>
            </Row>
        </Container>
    );
};

export default TaskBoard;
