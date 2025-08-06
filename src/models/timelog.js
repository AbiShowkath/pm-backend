import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class TimeLog extends Model {
    static associate(models) {
      TimeLog.belongsTo(models.Task, { foreignKey: 'taskId' });
      TimeLog.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  TimeLog.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    taskId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: DataTypes.DATE,
    description: DataTypes.TEXT
  }, { sequelize, modelName: 'TimeLog', tableName: 'time_entries' });
  return TimeLog;
};
