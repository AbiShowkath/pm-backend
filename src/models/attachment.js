import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class Attachment extends Model {
    static associate(models) {
      Attachment.belongsTo(models.Task, { foreignKey: 'taskId' });
      Attachment.belongsTo(models.Comment, { foreignKey: 'commentId' });
      Attachment.belongsTo(models.User, { foreignKey: 'uploadedBy', as: 'uploader' });
    }
  }
  Attachment.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    taskId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    fileUrl: { type: DataTypes.STRING, allowNull: false },
    fileName: { type: DataTypes.STRING, allowNull: false },
    uploadedBy: DataTypes.INTEGER
  }, { sequelize, modelName: 'Attachment', tableName: 'attachments' });
  return Attachment;
};
