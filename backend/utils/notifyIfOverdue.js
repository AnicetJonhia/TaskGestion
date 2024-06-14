const {io} = require("../server");
const notifyIfOverdue = async (task) => {
    const now = new Date();
      if (task.dueDate < now && task.status!== 'completed') {
        console.log(`Tâche "${task.title}" est en retard.`);
        io.to(`user_${task.userId}`).emit('overdueTask', { taskId: task._id, title: task.title });
      }
}

module.exports = {notifyIfOverdue};