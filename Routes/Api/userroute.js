const router = require('express').Router();
const { deleteReaction, addReaction } = require('../../Controllers/thoughtController');
const {
    // These are the functions under the user controller.
    createUser,
    getUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../Controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends').post(addFriend);
router.route('/:userId/friends/:friendId').put(deleteFriend);

module.exports = router;