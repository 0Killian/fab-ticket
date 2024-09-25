const { DataTypes } = require('sequelize');
const sequelize = require('../server/sequelize/database'); 

const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'category',
    timestamps: false,
  });

  module.exports = Category