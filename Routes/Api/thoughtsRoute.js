const router = require('express').Router();
const {
    // These are the functions found under the thoughts controller by name.
    getThoughts,
    getSingleThoughts,
   createThought,
   updateThought,
   deleteThought,
   addReaction,
   deleteReaction
} = require('../../Controllers/thoughtController');

// These are simplified versions of the thoughts controller based around the method they each address.
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThoughts).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions/').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').put(deleteReaction);

module.exports = router;