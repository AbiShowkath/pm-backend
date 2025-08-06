const { DataTypes } = require('sequelize');
const sequelize = require('./index');

// const User = require('./user');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }, status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'
  }, progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'projects',
  timestamps: true,
  underscored: true
});

// Project.belongsToMany(User, {
//   through: 'project_members'
// });

module.exports = Project;
