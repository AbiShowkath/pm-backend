const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// CRUD routes
router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// Additional route to fetch tasks with user and project details
router.get('/details', taskController.getTasksWithDetails);

module.exports = router;
