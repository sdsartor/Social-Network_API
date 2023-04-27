const router = require('express').Router();
const {
    createUser,
    getUsers,
    getSingleUser,
} = require('../../Controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser);

module.exports = router;