const { io } = require("../server");

const notifyIfOverdue = async (task) => {
    try {
        if (!task || !task.dueDate || !task.status || !task.title || !task.userId) {
            throw new Error('Task object is invalid or incomplete');
        }

        const now = new Date();
        if (task.dueDate < now && task.status !== 'completed') {
            console.log(`Tâche "${task.title}" est en retard.`);
            if (io && io.to) {
                io.to(`user_${task.userId}`).emit('overdueTask', { taskId: task._id, title: task.title });
            } else {
                console.error('Socket.io instance not properly initialized.');
            }
        }
    } catch (error) {
        console.error('Error in notifyIfOverdue:', error.message);
        // Handle the error as needed, possibly rethrow or return a specific value
    }
};

module.exports = { notifyIfOverdue };
