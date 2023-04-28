const router = require('express').Router();
const {
    getThoughts,
    getSingleThoughts,
   createThought,
   updateThought,
   deleteThought,
   addReaction,
   deleteReaction
} = require('../../Controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:id').get(getSingleThoughts).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;