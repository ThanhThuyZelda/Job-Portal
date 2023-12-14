'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CVWorkExp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CVWorkExp.belongsTo(models.JobSeeker, { foreignKey: 'JobSeekerID' });
    }
  }
  CVWorkExp.init({
    position: DataTypes.STRING,
    company: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    present: DataTypes.STRING,
    des: DataTypes.TEXT,
    JobSeekerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CVWorkExp',
  });
  return CVWorkExp;
};