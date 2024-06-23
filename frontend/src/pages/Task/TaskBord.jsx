import React, { useState, useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import TaskColumn from './TaskColumn';
import { getTasksByStatus, updateTask, deleteTask } from '../../services/api';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const TaskBoard = () => {
    const [taskList, setTaskList] = useState({
        Todo: [],
        InProgress: [],
        Completed: [],
        ForDelete: []
    });

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const todoTasks = await getTasksByStatus('Todo');
            const inProgressTasks = await getTasksByStatus('In progress');
            const completedTasks = await getTasksByStatus('Completed');
            const forDeleteTasks = await getTasksByStatus('For delete');

            setTaskList({
                Todo: todoTasks,
                InProgress: inProgressTasks,
                Completed: completedTasks,
                ForDelete: forDeleteTasks
            });
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    const handleDrop = async (taskId, targetColumn) => {
        try {
            if (targetColumn === 'For Delete') {
                await deleteTask(taskId);
            } else {
                const updatedTask = await updateTask(taskId, { status: targetColumn });
                const updatedTaskList = { ...taskList };

                // Remove task from its previous column
                updatedTaskList[updatedTask.status] = updatedTaskList[updatedTask.status].filter(task => task._id !== updatedTask._id);

                // Add task to the new column
                updatedTaskList[targetColumn] = [...updatedTaskList[targetColumn], updatedTask];

                setTaskList(updatedTaskList);
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <Container fluid className="vh-100 d-flex flex-column">
            <Row className="flex-grow-1">
                <DndProvider backend={HTML5Backend}>
                    <TaskColumn title="Todo" tasks={taskList.Todo} onDrop={handleDrop} />
                    <TaskColumn title="In progress" tasks={taskList.InProgress} onDrop={handleDrop} />
                    <TaskColumn title="Completed" tasks={taskList.Completed} onDrop={handleDrop} />
                    <TaskColumn title="For Delete" tasks={taskList.ForDelete} onDrop={handleDrop} />
                </DndProvider>
            </Row>
        </Container>
    );
};

export default TaskBoard;
