'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CVActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CVActivity.belongsTo(models.JobSeeker, { foreignKey: 'JobSeekerID' });
    }
  }
  CVActivity.init({
    name: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    des: DataTypes.TEXT,
    JobSeekerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CVActivity',
  });
  return CVActivity;
};