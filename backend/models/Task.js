/**
 * Task Model
 * 
 * Defines the schema for task objects with:
 * - Basic task properties (text, completion status)
 * - Metadata fields (due date, priority, category)
 * - User relationship for ownership
 * - Creation and update timestamps
 */
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  // Core task data
  text: {
    type: String,
    required: [true, 'Task text is required'],
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  
  // Relationship to user owner
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Task metadata fields
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
