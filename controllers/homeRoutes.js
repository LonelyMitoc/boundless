const router = require('express').Router();
const sequelize = require('../config/connection');
const { Story, User, UserStories } = require('../models');
const withAuth = require('../utils/auth');

// GET method to show all published stories on the homepage
router.get('/', async (req, res) => {
  try {
    // Find all published stories
    const storyData = await Story.findAll({
      where: {
        published: true
      },
      include: [
        {
          model: User,
          through: UserStories,
          attributes: ['username'],
        },
        {
          model: User,
          as: 'creator',
          attributes: ['username'],
        }
      ],
    });

    // Serialize data so the template can read it
    const stories = storyData.map((story) => story.get({ plain: true }));

    // Render homepage with the published stories we serialized
    res.render('homepage', {
      stories,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    const storyData = await Story.findAll({
      where: {
        published: false,
        checked_out: false
      },
      include: [{
        model: User,
        as: 'creator',
        attributes: ['username'],
      }
    ],
  });
  
  // Serialize the data
  const stories = storyData.map((story) => story.get({ plain: true }));
  
  // Select a random story for the user to collaborate
  const rand = Math.floor(Math.random()*stories.length);
  const getStory = stories[rand];

  // Change the story checked_out status to true
  //await sequelize.query(`UPDATE story SET checked_out = True WHERE id = ${getStory.id}`);
  const key= {
      key: process.env.OPENAI_API_KEY
  };
  
  // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Story }],
    });

    const user = userData.get({ plain: true });
    // Render the profile with the user info and the random story the user will collaborate with
    res.render('profile', {
      user, getStory, key,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET method to find a story via the story id
router.get('/story/:id', async (req, res) => {
  try {
    // Find the story via primary key; includes the username information
    const getStory = await Story.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    //Serialize the data
    const story = getStory.get({ plain: true });

    //Render the story page with the searched story
    res.render('story', {
      story,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET method for the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// GET method for the signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;
