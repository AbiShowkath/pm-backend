const Task = require('../models/task');
const Project = require('../models/project');
const User = require('../models/user');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { project_id, milestone_id, title, description, priority, status, assignee_id, due_date } = req.body;
    const task = await Task.create({
      project_id,
      milestone_id,
      title,
      description,
      priority,
      status,
      assignee_id,
      due_date,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: Project, attributes: ['name'] },
        { model: User, attributes: ['name', 'email'] },
      ],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        { model: Project, attributes: ['name'] },
        { model: User, attributes: ['name', 'email'] },
      ],
    });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, priority, status, due_date, assignee_id } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    // Prevent project_id from being updated
    if (req.body.project_id) {
      return res.status(400).json({ error: 'Cannot update project_id' });
    }

    await task.update({ title, description, priority, status, due_date, assignee_id });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    await task.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch tasks with user and project details
exports.getTasksWithDetails = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: Project, attributes: ['name'] },
        { model: User, attributes: ['name', 'email'] },
      ],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
