const { DataTypes } = require('sequelize');
const sequelize = require('../server/sequelize/database'); 

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
  author: {
    type: DataTypes.STRING(100),
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
