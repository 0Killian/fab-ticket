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
<<<<<<< HEAD
=======
    allowNull: false,
>>>>>>> 72ead2afe77b1c0543fdee47a7532ee3101b90ea
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
