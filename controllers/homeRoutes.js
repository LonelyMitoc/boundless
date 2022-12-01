const router = require('express').Router();
const { Story, User, UserStories} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

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
    // Pass serialized data and session flag into template
    console.log(stories);
    // res.render is available because
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
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Story }],
    });
    
    const user = userData.get({ plain: true });
    console.log(user)
    res.render('profile', {
      user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/story/:id', async (req, res) => {
  try {
    const getStory = await Story.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const story = getStory.get({ plain: true });
    
    res.render('story', {
      story,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;
