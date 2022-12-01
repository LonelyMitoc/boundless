const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Story, User, UserStories } = require('../../models');
const withAuth = require('../../utils/auth');




router.post('/', withAuth, async (req, res) => {
  try {
    const newStory = await Story.create({
      ...req.body,
      user_id: req.session.user_id,
      creator_id: req.session.user_id
    });
    console.log(newStory);

    const userStory = await UserStories.create({
      user_id: req.session.user_id,
      story_id: newStory.id,
    })
    console.log(userStory);
    res.status(200).json(newStory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req,res)=>{
  try {
    const story = await Story.findOne({where: { id: req.params.id}});
    console.log(story);
    story.content = req.body.sendText;
    story.contributors++;
    story.checked_out = false;
    if (story.contributors >= 10){
      story.published = true;
    }
    await story.save()
    await UserStories.findOrCreate({
      where:{user_id: req.session.user_id,
      story_id: story.id,}
    });
    res.status(200).json(story)
  } catch (err) {
    res.status(500).json(err);
  }
})



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
    }

    res.status(200).json(storyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
