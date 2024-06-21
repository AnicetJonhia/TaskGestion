import React, { useContext } from 'react';
import ToDo from './Task/ToDo';
import InProgress from './Task/InProgress';
import Complete from './Task/Complete';
import Create from '../Components/utils/Create';
import EditTask from './Task/EditTask';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TaskContext } from '.././context/TaskContext';  // Import correct du contexte

const Task = () => {
    const { tasks, addTask, deleteTask, editTask, setEditingTask, editingTask, setTasks } = useContext(TaskContext);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(source.index, 1);
        movedTask.status = destination.droppableId;
        updatedTasks.splice(destination.index, 0, movedTask);

        setTasks(updatedTasks);
    };

    return (
        <div>
            <h1>Task page</h1>
            <Create />
            {editingTask && <EditTask task={editingTask} editTask={editTask} setEditingTask={setEditingTask} />}
            <DragDropContext onDragEnd={onDragEnd}>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">ToDo</CardTitle>
                                <Droppable droppableId="todo">
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            <ToDo />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">In Progress</CardTitle>
                                <Droppable droppableId="in-progress">
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            <InProgress />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Complete</CardTitle>
                                <Droppable droppableId="complete">
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            <Complete />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </DragDropContext>
        </div>
    );
};

export default Task;
