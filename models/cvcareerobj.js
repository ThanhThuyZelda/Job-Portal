'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CVCareerObj extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CVCareerObj.belongsTo(models.JobSeeker, { foreignKey: 'JobSeekerID' });
    }
  }
  CVCareerObj.init({
    obj: DataTypes.TEXT,
    JobSeekerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CVCareerObj',
  });
  return CVCareerObj;
};