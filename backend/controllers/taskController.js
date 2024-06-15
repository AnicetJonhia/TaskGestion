const Task  = require("../models/taskModel");
const {notifyIfOverdue} = require("../utils/notifyIfOverdue");


// get all tasks
exports.getAllTasks = async (req, res) => {
     try {
        const tasks = await Task.find({});
        res.send(tasks);
     } catch (error) {
        res.status(500).send();
     }
}

//get all tasks by status
exports.getTasksByStatus = async (req, res) => {
      try {
            const tasks = await Task.find({ status: req.params.status });
            res.json(tasks);
      } catch (err) {
            res.status(500).json({ message: err.message });
      }
}

// get tasks number by status
exports.getTasksCount = async (req, res) => {
    try {
        const todoCount = await Task.countDocuments({ status: 'Todo' });
        const inProgressCount = await Task.countDocuments({ status: 'In progress' });
        const completedCount = await Task.countDocuments({ status: 'Completed' });

        res.json({
            todoCount: todoCount,
            inProgressCount: inProgressCount,
            completedCount: completedCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create task
exports.createTask = async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateTask = async (req, res) => {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['title', 'description', 'category', 'priority', 'dueDate', 'status', 'completed'];
      const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

      if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
      }

      try {
            const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });

            if (!task) {
              return res.status(404).send();
            }
            await notifyIfOverdue(task); // Vérifier et notifier si la tâche est en retard
            res.send(task);
      } catch (error) {
            res.status(400).send(error);
      }
}


exports.deleteTask = async (req, res) => {
      try {
            const task = await Task.findByIdAndDelete(req.params.id);

            if (!task) {
              return res.status(404).send();
            }

            res.send(task);
      } catch (error) {
            res.status(500).send();
      }
}

