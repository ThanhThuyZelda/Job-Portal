'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CVEducation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CVEducation.belongsTo(models.JobSeeker, { foreignKey: 'JobSeekerID' });

    }
  }
  CVEducation.init({
    school: DataTypes.STRING,
    major: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    present: DataTypes.STRING,
    more: DataTypes.STRING,
    JobSeekerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CVEducation',
  });
  return CVEducation;
};