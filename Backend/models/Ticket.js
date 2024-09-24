const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/database'); 

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
    validate:{
      len: [1, 101],  
      msg:"title use 100 characters max"
    },
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

module.exports = Tiquet;