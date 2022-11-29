const sequelize = require('../config/connection');
const { User, Story, UserStories } = require('../models');

const userData = require('./userData.json');
const storyData = require('./StoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const stories = await Story.bulkCreate(storyData, {
    individualHooks: true,
    returning: true,
  });

  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    await UserStories.create({
      user_id: story.creator_Id,
      story_id: story.id, 
    }).catch((err) => {
      console.log(err);
    });
  }

  process.exit(0);
};

seedDatabase();
