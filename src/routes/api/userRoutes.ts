import {Router} from 'express';
const router = Router();
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../../controllers/userControlller'; 

// GET all users

console.log('Setting up user routes');  // Debugging log
router.get('/', getUsers);

// GET a single user by ID
router.get('/:id', getUserById);

// POST a new user
router.post('/', createUser);

// PUT to update a user by ID
router.put('/:id', updateUser);

// DELETE to remove a user by ID
router.delete('/:id', deleteUser);
console.log('Deleting user');
// POST to add a new friend to user's friend list
router.post('/:userId/friends/:friendId', addFriend);

// DELETE to remove a friend from user's friend list
router.delete('/:userId/friends/:friendId', removeFriend);

export {router as userRouter};