'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Employer.hasMany(sequelize.define('Post'));
    }
  }
  Employer.init({
    fullname: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    position: DataTypes.STRING,
    img: DataTypes.STRING,
    company: DataTypes.STRING,
    companyID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employer',
  });
  return Employer;
};