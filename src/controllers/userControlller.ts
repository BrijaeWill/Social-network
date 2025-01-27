import { Request, Response } from 'express';
import User  from '../models/User';
import {IUser} from "../models/User"
import Thought from '../models/thought'; 
//Get All users
export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
try{
const Users: IUser[] = await User.find().populate('thoughts').populate('friends');
return res.status(200).json(Users);
}catch (err){
console.error(err);
return res.status(500).json({message: 'Error retrieving users', error: err});
}
};
//Get a single User by id
export const getUserById = async (req: Request, res: Response): Promise<Response> =>{
try{
const userId = req.params.id;// get the user id
const user: IUser | null = await User.findById(userId).populate('thoughts').populate('friends');  
if (!user) {
return res.status(404).json({message: 'User not found'});   
}
return res.status(200).json(user);
}catch (err){
    console.error(err);
    return res.status(500).json({message: 'Error retrieving user', error:err})
}
};

//post a new user
export const createUser = async (req: Request, res: Response): Promise<Response> =>{
    const {username, email} = req.body;
    try{
    const newUser: IUser = new User({username, email});
    await newUser.save();
    return res.status(201)   .json(newUser);
    } catch (err){
        return res.status(400).json({message:'Error creating user',error: err})
    }
};
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const  {username, email} = req.body;
    try{
        const user: IUser | null = await User.findByIdAndUpdate(
        req.params.id,
        {username, email},
        {new: true, runValidators: true}
        );
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    return res.status(200).json(user);
} catch (err){
    return res.status(400).json({message: 'Error updating user', error:err})
}
};
// DELETE to remove user by its _id
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user: IUser | null = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // BONUS: Remove a user's associated thoughts
        return res.status(204).send(); // No content
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting user', error: err });
    }
};
//Post to add a new friend to user friend list
export const addFriend = async (req: Request, res: Response): Promise<Response> =>{
    const {userId,friendId} = req.params;
    try{
        const user = await User.findByIdAndUpdate(
            userId,
            {$addToSet:{friends: friendId}},
            {new :true}
        );
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json(user);
    }catch(err){
    console.error(err);
    return res.status(500).json({message: 'Error adding friend', error: err})
    }
};
// DELETE to remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response): Promise<Response> => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } }, // Use $pull to remove the friendId
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Error removing friend from user friend list'})
    }
}

    