const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/database'); 

const Borrow = sequelize.define('Borrow', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  startDate: {
    type: DataTypes.DATE,
  },
  endDate: {
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  materialId: {
    type: DataTypes.INTEGER,
  },
  commentary: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'borrow',
  timestamps: false,
});


module.exports = Borrow;
