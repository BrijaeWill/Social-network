import { Request, Response } from 'express';
import User  from '../models/User';
import {IUser} from "../models/User";
//Get All users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const Users: IUser[] = await User.find().populate('thoughts').populate('friends');
        console.log('Sending users');
        res.status(200).json(Users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving users', error: err });
    }
};
// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const user: IUser | null = await User.findById(userId).populate('thoughts').populate('friends');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving user', error: err });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    console.log('createUser endpoint hit');
    const { username, email } = req.body;
    try {
        const newUser: IUser = new User({ username, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: 'Error creating user', error: err });
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email } = req.body;
    try {
        const user: IUser | null = await User.findByIdAndUpdate(
            req.params.id,
            { username, email },
            { new: true, runValidators: true }
        );
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: 'Error updating user', error: err });
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser | null = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
};

// Add a friend
export const addFriend = async (req: Request, res: Response): Promise<void> => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding friend', error: err });
    }
};

// Remove a friend
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error removing friend from user friend list' });
    }
};
