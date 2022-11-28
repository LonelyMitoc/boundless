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

module.exports = { User, Story, UserStories };
