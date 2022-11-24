const User = require('./User');
const Story = require('./Story');
const User_Stories = sequelize.define('User_stories', {}, { timestamps: false });

User.hasMany(Story, {
  through: 'User_Stories',
  foreignKey: 'user_id',
  onDelete: 'NO ACTION',
});

Story.belongsToMany(User, {
  through: 'User_Stories',
  foreignKey: 'user_id',
});

module.exports = { User, Story };
