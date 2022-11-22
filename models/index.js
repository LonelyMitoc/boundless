const User = require('./User');
const Story = require('./Story');

User.hasMany(Story, {
  foreignKey: 'user_id',
  onDelete: 'NO ACTION'
});

Story.belongsToMany(User, {
  through: 'User_Stories',
  foreignKey: 'user_id',
});

module.exports = { User, Story };
