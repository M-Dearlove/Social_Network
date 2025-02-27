import User from '../models/User.js';
import { Request, Response } from 'express';

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// update a user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// delete a user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
}