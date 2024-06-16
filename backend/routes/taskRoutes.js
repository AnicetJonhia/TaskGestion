const express = require('express');
const router = express.Router();
const { getAllTasks, getTasksByStatus, getTasksCount, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const authenticate = require('../midddleware/authMiddleware');

router.get('/get-all-tasks', authenticate, getAllTasks);
router.get('/get-tasks/:status', authenticate, getTasksByStatus);
router.get('/get-tasks-count', authenticate, getTasksCount);
router.post('/create-task', authenticate, createTask);
router.patch('/update-task/:id', authenticate, updateTask);
router.delete('/delete-task/:id', authenticate, deleteTask);

module.exports = router;
