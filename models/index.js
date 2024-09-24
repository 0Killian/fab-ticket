const sequelize = require('../config/database');
const User = require('./User');
const Material = require('./Material');
const Category = require('./Category');
const Borrow = require('./Borrow');
const Ticket = require('./Ticket');
const Condition = require('./Condition');

// Associations
Material.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Material.belongsTo(Condition, { foreignKey: 'conditionId', as: 'condition' });

Borrow.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Borrow.belongsTo(Material, { foreignKey: 'materialId', as: 'material' });

Ticket.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  Material,
  Category,
  Borrow,
  Ticket,
  Condition
};
