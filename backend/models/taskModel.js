const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  priority: Number,
  dueDate: Date,
  status: { type: String, enum: ['Todo', 'In progress', 'Completed'], default: 'Todo', required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }, // Ajoutez ce champ
  updatedAt: { type: Date, default: Date.now }, // Et ce champ
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true // Active l'option timestamps pour mettre à jour automatiquement createdAt et updatedAt
});

const Task = mongoose.model('tasks', TaskSchema);
module.exports = Task;
