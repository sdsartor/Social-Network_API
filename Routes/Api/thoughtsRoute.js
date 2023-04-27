const router = require('express').Router();
const {
    getThoughts,
    getSingleThoughts,
   createThought,
   updateThought,
   deleteThought
} = require('../../Controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:id').get(getSingleThoughts);

module.exports = router;