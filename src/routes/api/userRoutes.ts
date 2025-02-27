import { Router } from 'express';
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';

const router = Router();

router.route('/').get(getUsers);
router.route('/:userId').get(getSingleUser);
router.route('/').post(createUser);
router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);
router.route('/:userId/friends/:friendId').put(addFriend);
router.route('/:userId/friends/:friendId').delete(removeFriend);

export default router;