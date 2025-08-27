const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Task text is required'],
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // New fields for filtering and sorting
  dueDate: {
    type: Date,
    required: false
  },
  priority: {
    type: Number,
    default: 0,  // 0: No priority, 1: Low, 2: Medium, 3: High
    min: 0,
    max: 3
  },
  // Category field for task categorization
  category: {
    type: String,
    required: false,
    trim: true
  }
});

module.exports = mongoose.model('Task', TaskSchema);
