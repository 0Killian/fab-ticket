const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/database');

const Condition = sequelize.define('Condition', {
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
    tableName: 'condition',
    timestamps: false,
  });

  module.exports = Condition;