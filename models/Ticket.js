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
    validate: {
      isIn: {
        args: [[0, 1, 2]],
        msg: "Status must be 0 (default), 1 (in progress), or 2 (closed)"
      }
    }
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
  author: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'ticket',
  timestamps: false,
  hooks: {
    beforeUpdate: (ticket) => {
      if (ticket.status != ticket.previous('status')) {
        if (ticket.status == 2 && ticket.previous('status') !== 1) {
          throw new Error("Ticket can only be closed if it's in progress");
        } else if (ticket.status == 1 && ticket.previous('status') !== 0) {
          throw new Error("Ticket can only be set to 'in progress' (status 1) if it's in 'default' (status 0)");
        } else if (ticket.status == 0) {
            throw new Error("Ticket can only be opened once");
        }
      }
    }
  }
});

module.exports = Ticket;
