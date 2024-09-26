const Material = require('./Material');
const Category = require('./Category');
const Borrow = require('./Borrow');
const Ticket = require('./Ticket');
const Condition = require('./Condition');

// Associations
Material.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Material.belongsTo(Condition, { foreignKey: 'conditionId', as: 'condition' });

Borrow.belongsTo(Material, { foreignKey: 'materialId', as: 'material' });

module.exports = {
  Material,
  Category,
  Borrow,
  Ticket,
  Condition
};
