const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./middleware/errorHandler.js');
const projectRoutes = require('./routes/projectRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const teamRoutes = require('./routes/teamRoutes.js');
const milestoneRoutes = require('./routes/milestoneRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');

app.use(cors());
app.use(express.json());
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

module.exports = app;