import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const initialTask = { id: 1, title: 'Task 1', priority: 'high' };

const ItemTypes = {
    TASK: 'TASK',
};

const TaskCard = ({ task, onDrop }) => {
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

const TaskColumn = ({ title, tasks, onDrop }) => {
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
        <Col md={3} className="p-2" ref={drop}>
            <Card className={`p-2 ${isActive ? 'bg-light' : ''}`}>
                <CardTitle tag="h5">{title}</CardTitle>
                <CardBody>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onDrop={onDrop} />
                    ))}
                </CardBody>
            </Card>
        </Col>
    );
};

const TaskBoard = () => {
    const [taskList, setTaskList] = useState({
        Todo: [initialTask],
        InProgress: [],
        Completed: [],
        ForDelete: [],
    });

    const handleDrop = (taskId, column) => {
        setTaskList((prevTaskList) => {
            const updatedTaskList = {
                ...prevTaskList,
                [column]: prevTaskList[column].map((task) =>
                    task.id === taskId ? { ...task, priority: getColumnPriority(column) } : task
                ),
            };

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
