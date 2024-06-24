import axios from '../axios-config';

const API_BASE_URL = 'http://localhost:5000/api/tasks';

export const getAllTasks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-all-tasks`);
        return response.data.tasks;
    } catch (error) {
        handleApiError(error);
    }
};

export const getTasksByStatus = async (status) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-tasks/${status}`);
        return response.data.tasks;
    } catch (error) {
        handleApiError(error);
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create-task`, taskData);
        return response.data.task;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateTask = async (taskId, updates) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/update-task/${taskId}`, updates);
        return response.data.task;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete-task/${taskId}`);
        return response.data.msg;
    } catch (error) {
        handleApiError(error);
    }
};

const handleApiError = (error) => {
    console.error('API Error:', error);
    throw error;
};
