const sequelize = require('../config/connection');
const { User, Story } = require('../models');

const userData = require('./userData.json');
const StoryData = require('./StoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const Story of StoryData) {
    await Story.create({
      ...Story,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
