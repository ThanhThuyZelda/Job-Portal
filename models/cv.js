'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CV extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CV.init({
    img: DataTypes.STRING,
    desc: DataTypes.STRING,
    jobSeekerID: DataTypes.INTEGER,
    postID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CV',

  });
  return CV;
};