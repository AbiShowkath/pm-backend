import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Project, { foreignKey: 'projectId' });
      Task.belongsTo(models.User, { foreignKey: 'assigneeId', as: 'assignee' });
      Task.hasMany(models.Comment, { foreignKey: 'taskId' });
      Task.hasMany(models.TimeLog, { foreignKey: 'taskId' });
      Task.hasMany(models.Attachment, { foreignKey: 'taskId' });
    }
  }
  Task.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    projectId: { type: DataTypes.INTEGER, allowNull: false },
    milestoneId: DataTypes.INTEGER,
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    priority: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    assigneeId: DataTypes.INTEGER,
    dueDate: DataTypes.DATE
  }, { sequelize, modelName: 'Task', tableName: 'tasks' });
  return Task;
};
