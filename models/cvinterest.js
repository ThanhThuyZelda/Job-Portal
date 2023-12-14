'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CVInterest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CVInterest.belongsTo(models.JobSeeker, { foreignKey: 'JobSeekerID' });
    }
  }
  CVInterest.init({
    des: DataTypes.TEXT,
    JobSeekerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CVInterest',
  });
  return CVInterest;
};