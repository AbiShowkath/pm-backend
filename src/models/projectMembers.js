const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Project = require('./project');
const User = require('./user');

const ProjectMembers = sequelize.define('ProjectMembers', {
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'project_id'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id'
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'project_members',
  timestamps: false,
  underscored: true
});

User.belongsToMany(Project, {
  through: 'project_members'
});
Project.belongsToMany(User, {
  through: 'project_members'
});

module.exports = ProjectMembers;