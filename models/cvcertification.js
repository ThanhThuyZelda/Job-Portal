'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CVCertification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CVCertification.belongsTo(models.JobSeeker, { foreignKey: 'JobSeekerID' });
    }
  }
  CVCertification.init({
    name: DataTypes.TEXT,
    time: DataTypes.DATE,
    JobSeekerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CVCertification',
  });
  return CVCertification;
};