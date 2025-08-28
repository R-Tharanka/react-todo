const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { protect } = require('../middleware/authMiddleware');

// Apply auth middleware to all routes
router.use(protect);

// GET all tasks for logged in user with filtering and sorting
router.get('/', async (req, res) => {
  try {
    const { filter, sort } = req.query;
    let query = { user: req.user._id };
    let sortOptions = { createdAt: -1 }; // Default sort by newest

    // Apply filters
    if (filter) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      switch (filter) {
        case 'completed':
          query.completed = true;
          break;
        case 'today':
          query.dueDate = {
            $gte: today,
            $lt: tomorrow
          };
          break;
        case 'upcoming':
          query.dueDate = { $gte: tomorrow };
          query.completed = false;
          break;
        case 'overdue':
          query.dueDate = { $lt: today };
          query.completed = false;
          break;
        // 'all' and default: no additional filter
      }
    }

    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'oldest':
          sortOptions = { createdAt: 1 };
          break;
        case 'priority':
          sortOptions = { priority: -1, createdAt: -1 };
          break;
        case 'az':
          sortOptions = { text: 1 };
          break;
        // 'newest' and default: already set to { createdAt: -1 }
      }
    }

    const tasks = await Task.find(query).sort(sortOptions);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a task
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.text || req.body.text.trim() === '') {
      return res.status(400).json({ message: 'Task text is required' });
    }

    // Log incoming request data for debugging
    console.log('Creating new task with data:', req.body);

    const newTask = new Task({
      text: req.body.text,
      completed: req.body.completed || false,
      user: req.user._id,
      dueDate: req.body.dueDate || null,
      priority: req.body.priority !== undefined ? req.body.priority : 0,
      category: req.body.category || null
    });

    // Log task object before saving
    console.log('Task object to be saved:', newTask);

    const savedTask = await newTask.save();
    console.log('Task saved successfully:', savedTask);
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update a task
router.put('/:id', async (req, res) => {
  try {
    if (req.body.text !== undefined && req.body.text.trim() === '') {
      return res.status(400).json({ message: 'Task text cannot be empty' });
    }

    // Prepare update object with only the fields that are provided
    const updateObj = {};

    if (req.body.text !== undefined) {
      updateObj.text = req.body.text;
    }

    if (req.body.completed !== undefined) {
      updateObj.completed = req.body.completed;
    }

    if (req.body.dueDate !== undefined) {
      updateObj.dueDate = req.body.dueDate;
    }

    if (req.body.priority !== undefined) {
      updateObj.priority = req.body.priority;
    }

    if (req.body.category !== undefined) {
      updateObj.category = req.body.category;
    }

    // Find task by id and user id to ensure users can only update their own tasks
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateObj,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH toggle task completion
router.patch('/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = !task.completed;
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
