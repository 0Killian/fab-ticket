const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/database'); 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate:{
      len: [3, 20],
      msg:"firstname must be between 3 and 20 characters"
    }
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate:{
      len: [3, 20],
      msg:"lastame must be between 3 and 20 characters"
    }
  },
  passwordHash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate:{
      len: [8, 20],  
      msg:"password must be between 8 and 20 characters"
    },
    is:{
      args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 
      msg: "Password needs at least one lowercase letter, one uppercase letter, and one number",
    }
  },
  role: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'user',
  timestamps: false,
});

module.exports = User;
