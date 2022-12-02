const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Story, User, UserStories } = require('../../models');
const withAuth = require('../../utils/auth');

// POST method to create a new story and create the many-to-many association in the UserStories table
router.post('/', withAuth, async (req, res) => {
  try {
    const newStory = await Story.create({
      ...req.body,
      user_id: req.session.user_id,
      creator_id: req.session.user_id
    });

    const userStory = await UserStories.create({
      user_id: req.session.user_id,
      story_id: newStory.id,
    });
    res.status(200).json(newStory);
  } catch (err) {
    res.status(400).json(err);
  }
});

//PUT method to update the randomly assigned story with the new content the user submits
router.put('/:id', withAuth, async (req, res) => {
  try {
    const story = await Story.findOne({ where: { id: req.params.id } });

    story.content = req.body.sendText;
    story.contributors++;
    story.checked_out = false;
    if (story.contributors >= 10) {
      story.published = true;
      story.date_published = sequelize.literal('CURRENT_TIMESTAMP');
    };
    await story.save();

    await UserStories.findOrCreate({
      where: {
        user_id: req.session.user_id,
        story_id: story.id,
      }
    });
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json(err);
  }
})

// DELETE method to delete the story via id (for future implementation)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const storyData = await Story.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!storyData) {
      res.status(404).json({ message: 'No story found with this id!' });
      return;
    };

    res.status(200).json(storyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
