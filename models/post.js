'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Post.belongsTo(models.Employer, { foreignKey: 'empID' });
      Post.belongsTo(models.Company, { foreignKey: 'compID' });
      Post.belongsTo(models.City, { foreignKey: 'skillID' });
    }
  }
  Post.init({
    headline: DataTypes.TEXT,
    salary: DataTypes.STRING,
    gender: DataTypes.STRING,
    require: DataTypes.TEXT,
    des: DataTypes.TEXT,
    benefit: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    address: DataTypes.STRING,
    workform: DataTypes.TEXT,
    positionID: DataTypes.INTEGER,
    skillID: DataTypes.INTEGER,
    empID: DataTypes.INTEGER,
    compID: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    DeadlineSubmission: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};