const express = require('express');
const router = express.Router();

const  {getAllTasks, getTasksByStatus,createTask, updateTask, deleteTask} = require('../controllers/taskController');

router.get('/get-all-tasks', getAllTasks);
router.get('/get-tasks/:status', getTasksByStatus);
router.post('/create-task', createTask);
router.patch('/update-task/:id', updateTask);
router.delete('/delete-task/:id', deleteTask);

module.exports = router;