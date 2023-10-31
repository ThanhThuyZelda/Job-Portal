'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    headline: DataTypes.TEXT,
    salary: DataTypes.STRING,
    // gender: DataTypes.BOOLEAN,
    gender: DataTypes.STRING,
    require: DataTypes.TEXT,
    des: DataTypes.TEXT,
    address: DataTypes.STRING,
    positionID: DataTypes.INTEGER,
    empID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};