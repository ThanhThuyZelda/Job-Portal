'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Company.belongsTo(models.Employer, { foreignKey: 'companyID' });
      Company.hasMany(models.Post);
    }
  }
  Company.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    address: DataTypes.STRING,
    worktime: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.TEXT,
    website: DataTypes.STRING,
    scale: DataTypes.STRING,
    skill: DataTypes.STRING,
    skillID: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};