'use strict';
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Posts.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false, // NOT NULL, Null을 허용하지 않음
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true, // NULL
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false, // NOT NULL, Null을 허용하지 않음
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // NOT NULL, Null을 허용하지 않음
      },
    },
    {
      sequelize,
      modelName: 'Posts',
    }
  );
  return Posts;
};
