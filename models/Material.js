const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/database'); 


const Material = sequelize.define('Material', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  inventoryId: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
  },
  photo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  buyDate: {
    type: DataTypes.DATE,
  },
  conditionId: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'material',
  timestamps: false,
});
module.exports = Material;