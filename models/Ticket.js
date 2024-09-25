const { DataTypes } = require('sequelize');
const sequelize = require('../server/sequelize/database'); 

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  creationDate: {
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'ticket',
  timestamps: false,
});

module.exports = Ticket;
