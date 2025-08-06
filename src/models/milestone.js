const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Project = require('./project');

const Milestone = sequelize.define('Milestone', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    project_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Project,
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'milestones',
    timestamps: true,
    underscored: true
});

Project.hasMany(Milestone, { foreignKey: 'project_id' });
Milestone.belongsTo(Project, { foreignKey: 'project_id' });

module.exports = Milestone;
