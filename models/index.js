const User = require('./User');
const Story = require('./Story');
const UserStories = require('./UserStories');

User.belongsToMany(Story, {
  through: 'user_stories',
  unique: false,
  onDelete: 'NO ACTION',
});

Story.belongsToMany(User, {
  through: 'user_stories',
  unique: false,
  onDelete: 'NO ACTION',
});
Story.belongsTo(User,{
  foreignKey: 'creator_id',
  onDelete:'NO ACTION',
  as: 'creator'
});
User.hasMany(Story,{
  foreignKey: 'creator_id',
  as: 'creator'
})

module.exports = { User, Story, UserStories };
