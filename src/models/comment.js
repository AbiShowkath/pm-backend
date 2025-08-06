import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Task, { foreignKey: 'taskId' });
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.hasMany(models.Attachment, { foreignKey: 'commentId' });
    }
  }
  Comment.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    taskId: { type: DataTypes.INTEGER, allowNull: false },
    userId: DataTypes.INTEGER,
    content: { type: DataTypes.TEXT, allowNull: false }
  }, { sequelize, modelName: 'Comment', tableName: 'comments' });
  return Comment;
};
