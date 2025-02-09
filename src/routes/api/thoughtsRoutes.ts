import {Router}  from 'express';
const router = Router();
import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} from '../../controllers/thoughtControllers';

// Define routes for thoughts
router.get('/', getAllThoughts) // Get all thoughts
router.get('/:id', getThoughtById); // Get a single thought by its ID
router.post('/', createThought); // Create a new thought
router.put('/:id', updateThought); // Update a thought by its ID
router.delete('/:id', deleteThought); // Delete a thought by its ID

//Reactions
// Add reaction route
router.post('/:thoughtId/reactions', addReaction);

// Remove reaction route
router.delete('/:thoughtId/reactions/:reactionId', removeReaction)


export {router as thoughtRouter};