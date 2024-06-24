const Task = require("../models/taskModel");
const { notifyIfOverdue } = require("../utils/notifyIfOverdue");

// Créer une tâche pour l'utilisateur authentifié
exports.createTask = async (req, res) => {
    const userId = req.user.userId; // Utilisez l'ID utilisateur extrait par le middleware
    const task = new Task({ ...req.body, userId });

    try {
        await task.save();

        res.status(201).json({ task });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(201).json({ task , msg : "Task created successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir toutes les tâches de l'utilisateur authentifié
exports.getAllTasks = async (req, res) => {
    try {
        const userId = req.user.userId;
        // const tasks = await Task.find({ userId: req.user._id });
        const tasks = await Task.find({  userId: userId}).sort({createdAt : -1});

        res.status(200).json({ tasks });
    } catch (error) {
        console.error("Error getting tasks:", error);
        res.status(500).json({ message: error.message });
    }
};

// Obtenir toutes les tâches par statut pour l'utilisateur authentifié
exports.getTasksByStatus = async (req, res) => {
    try {
        const userId = req.user.userId;
        const tasks = await Task.find({ userId: userId, status: req.params.status }).sort({createdAt : -1});

        res.status(200).json({ tasks });
    } catch (error) {
        console.error("Error getting tasks by status:", error);
        res.status(500).json({ message: error.message });
    }
};

// Obtenir le nombre de tâches par statut pour l'utilisateur authentifié
exports.getTasksCount = async (req, res) => {
    try {
        const userId = req.user.userId;
        const todoCount = await Task.countDocuments({ userId: userId, status: 'Todo' });
        const inProgressCount = await Task.countDocuments({ userId: userId, status: 'In progress' });
        const completedCount = await Task.countDocuments({ userId: userId, status: 'Completed' });
        res.status(200).json({ todoCount, inProgressCount, completedCount });
    } catch (error) {
        console.error("Error getting tasks count:", error);
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une tâche pour l'utilisateur authentifié
exports.updateTask = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'category', 'priority', 'dueDate', 'status', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const userId = req.user.userId; // Utilisez l'ID utilisateur extrait par le middleware
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await notifyIfOverdue(task); // Notifier si la tâche est en retard

        res.status(200).json({ task });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une tâche pour l'utilisateur authentifié
exports.deleteTask = async (req, res) => {
    try {
        const userId = req.user.userId;
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId : userId});

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ msg: "Task deleted " });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: error.message });
    }
};
