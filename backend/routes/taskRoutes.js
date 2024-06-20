const express = require('express');
const router = express.Router();
const { getAllTasks, getTasksByStatus, getTasksCount, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../midddleware/authMiddleware');

router.get('/get-all-tasks',auth, getAllTasks);
router.get('/get-tasks/:status',auth, getTasksByStatus);
router.get('/get-tasks-count',auth, getTasksCount);
router.post('/create-task', auth, createTask);
router.patch('/update-task/:id', auth, updateTask);
router.delete('/delete-task/:id', auth, deleteTask);

module.exports = router;


