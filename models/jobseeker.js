'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobSeeker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // JobSeeker.hasMany(sequelize.define('CV'));
      JobSeeker.hasOne(sequelize.define('CVInfor'));
      JobSeeker.hasOne(sequelize.define('CVCareerObj'));
      JobSeeker.hasOne(sequelize.define('CVInterest'));
      JobSeeker.hasMany(sequelize.define('CVActivity'));
      JobSeeker.hasMany(sequelize.define('CVAward'));
      JobSeeker.hasMany(sequelize.define('CVCertification'));
      JobSeeker.hasMany(sequelize.define('CVEducation'));
      JobSeeker.hasMany(sequelize.define('CVSkill'));
      JobSeeker.hasMany(sequelize.define('CVWorkExp'));
      JobSeeker.hasMany(sequelize.define('CV'));
    }
  }
  JobSeeker.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JobSeeker',
  });
  return JobSeeker;
};