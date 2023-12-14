'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CVInfor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CVInfor.belongsTo(models.JobSeeker, { foreignKey: 'JobSeekerID' });
    }
  }
  CVInfor.init({
    fullname: DataTypes.STRING,
    img: DataTypes.STRING,
    email: DataTypes.STRING,
    position: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    link: DataTypes.STRING,
    address: DataTypes.STRING,
    birthday: DataTypes.DATE,
    JobSeekerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CVInfor',
  });
  return CVInfor;
};