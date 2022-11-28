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

  const story = await Story.bulkCreate(storyData, {
    individualHooks: true,
    returning: true,
  });

  for (let i = 0; i < story.length; i++) {
    const { id: randomUserId } = users[
      Math.floor(Math.random() * users.length)
    ];

    const { id: randomStoryId } = story[
      Math.floor(Math.random() * story.length)
    ];

    await UserStories.create({
      user_id: randomUserId,
      story_id: randomStoryId 
    }).catch((err) => {
      console.log(err);
    });
  }

  process.exit(0);
};

seedDatabase();
