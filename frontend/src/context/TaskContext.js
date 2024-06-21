import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const editTask = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, editTask, setEditingTask, editingTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContextProvider;
