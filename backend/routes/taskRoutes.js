const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authmiddleware'); // Use authentication middleware
const router = express.Router();

// Create Task Route
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, status } = req.body;
    const userId = req.userId;  // Get the authenticated user's ID from the middleware

    try {
        const newTask = new Task({
            title,
            description,
            status,
            userId,  // Attach the userId when creating the task
        });

        await newTask.save();  // Save the task to the database
        res.status(201).json(newTask);  // Return the newly created task
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating task' });
    }
});

// Fetch Tasks Route based on User ID
router.get('/', authMiddleware, async (req, res) => {
    const userId = req.userId;  // Get the userId from the middleware

    try {
        const tasks = await Task.find({ userId });  // Fetch tasks associated with the logged-in user
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// Update Task Route
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description, status } = req.body;
    const userId = req.userId;  // Get the userId from the middleware

    try {
        const task = await Task.findById(req.params.id);  // Find the task by ID

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Check if the task belongs to the logged-in user
        if (task.userId.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'You do not have permission to update this task' });
        }

        // Update the task fields
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        const updatedTask = await task.save();  // Save the updated task
        res.status(200).json(updatedTask);  // Return the updated task
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to update task' });
    }
});

// Delete Task Route
router.delete('/:id', authMiddleware, async (req, res) => {
    const userId = req.userId;  // Get the userId from the middleware

    try {
        const task = await Task.findById(req.params.id);  // Find the task by ID

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Check if the task belongs to the logged-in user
        if (task.userId.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'You do not have permission to delete this task' });
        }

        // Delete the task
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to delete task' });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;  // Get task ID from the URL parameter
    const userId = req.userId;  // Get the user ID from the middleware

    try {
        const task = await Task.findOne({ _id: id, userId });  // Find task by ID and userId

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);  // Return the task data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching task' });
    }
});

module.exports = router;
