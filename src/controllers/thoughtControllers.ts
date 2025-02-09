import {Thought} from '../models/thought';
import User  from '../models/User'; 
import { Request, Response } from 'express';

//get all thoughts
export const getAllThoughts = async ( req: Request, res: Response)=> {
    try{
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (error){
        res.status(500).json({message: 'Error retrieving thoughts',error})
    }
};

export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return; // Explicitly return to avoid further execution
        }
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving thought', error });
    }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body);
        // Assuming you have a User model and the user's ID is in the request body
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
        res.status(201).json(newThought);
    } catch (error) {
        res.status(400).json({ message: 'Error creating thought', error });
    }
};
export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.status(200).json(thought);
    } catch (error) {
        res.status(400).json({ message: 'Error updating thought', error });
    }
};

// Delete a thought by its _id
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting thought', error });
    }
};
// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } }, // Assuming req.body contains the reaction data
            { new: true, runValidators: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.status(200).json(thought);
    } catch (error) {
        res.status(400).json({ message: 'Error adding reaction', error });
    }
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Use the reactionId to find the reaction to remove
            { new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.status(200).json({message:'Reactions removed'});
    } catch (error) {
        res.status(500).json({ message: 'Error removing reaction', error });
    }
};