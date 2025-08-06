const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Project = require('./project');
const User = require('./user');
const Milestone = require('./milestone');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  milestone_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'milestones',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'open'
  },
  assignee_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'tasks',
  timestamps: true,
  underscored: true
});

Project.hasMany(Task, { foreignKey: 'project_id' });
Task.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(Task, { foreignKey: 'assignee_id' });
Task.belongsTo(User, { foreignKey: 'assignee_id' });

Milestone.hasMany(Task, { foreignKey: 'milestone_id' });
Task.belongsTo(Milestone, { foreignKey: 'milestone_id' });

module.exports = Task;