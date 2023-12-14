'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CVAward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CVAward.belongsTo(models.JobSeeker, { foreignKey: 'JobSeekerID' });
    }
  }
  CVAward.init({
    name: DataTypes.STRING,
    time: DataTypes.DATE,
    JobSeekerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CVAward',
  });
  return CVAward;
};