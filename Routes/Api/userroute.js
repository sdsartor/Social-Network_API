const router = require('express').Router();
const { deleteReaction, addReaction } = require('../../Controllers/thoughtController');
const {
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
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;