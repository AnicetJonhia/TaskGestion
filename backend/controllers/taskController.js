const Task = require("../models/taskModel");
const jwt = require("jsonwebtoken");

const { notifyIfOverdue } = require("../utils/notifyIfOverdue");

// get all tasks for the authenticated user
exports.getAllTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ userId });

        // Génère un jeton d'accès JWT avec le nom de l'utilisateur
        const accessToken = jwt.sign({ username: req.user.name }, process.env.JWT_SECRET);

        // Envoi de la réponse avec les tâches et le jeton
        res.status(200).json({
            tasks,
            accessToken
        });

    } catch (error) {
        res.status(500).send();
    }
};

// get all tasks by status for the authenticated user
exports.getTasksByStatus = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ userId, status: req.params.status });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get tasks number by status for the authenticated user
exports.getTasksCount = async (req, res) => {
    try {
        const userId = req.user._id;
        const todoCount = await Task.countDocuments({ userId, status: 'Todo' });
        const inProgressCount = await Task.countDocuments({ userId, status: 'In progress' });
        const completedCount = await Task.countDocuments({ userId, status: 'Completed' });

        // Génère un jeton d'accès JWT avec le nom de l'utilisateur
        const accessToken = jwt.sign({ username: req.user.name }, process.env.JWT_SECRET);

        res.json({
            todoCount ,
            inProgressCount,
            completedCount,
            accessToken
        });
    } catch (error) {
        console.log("Getting tasks count", error);
        res.status(500).json({ message: error.message });
    }
};

// Create task for the authenticated user
exports.createTask = async (req, res) => {
    const userId = req.user._id;
    console.log('Creating task for user:', userId);
    const task = new Task({ ...req.body, userId });
    try {
        // Génère un jeton d'accès JWT avec le nom de l'utilisateur
        const accessToken = jwt.sign({ username: req.user.name }, process.env.JWT_SECRET);
        await task.save();
        // Envoi de la réponse avec les tâches et le jeton
        res.status(200).json({
            task,
            accessToken
        });
    } catch (error) {
        console.log("Error creating task:",error)
        res.status(400).send(error);
    }
};

// Update task for the authenticated user
exports.updateTask = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'category', 'priority', 'dueDate', 'status', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const userId = req.user._id;
        const task = await Task.findOneAndUpdate({ _id: req.params.id, userId }, req.body, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send();
        }
        await notifyIfOverdue(task); // Vérifier et notifier si la tâche est en retard

        // Génère un jeton d'accès JWT avec le nom de l'utilisateur
        const accessToken = jwt.sign({ username: req.user.name }, process.env.JWT_SECRET);

        // Envoi de la réponse avec les tâches et le jeton
        res.status(200).json({
            task,
            accessToken
        });
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete task for the authenticated user
exports.deleteTask = async (req, res) => {
    try {
        const userId = req.user._id;
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
};
