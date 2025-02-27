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

export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);

        if (!user || !friend) {
            res.status(404).json({ message: 'No user or friend with that id!' });
            return;
        }

        if (user.friends.includes(friend._id as any)) {
            res.status(400).json({ message: 'Already friends!' });
            return;
        }

        user.friends.push(friend._id as any);
        friend.friends.push(user._id as any);
        await user.save();
        await friend.save();

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);

        if (!user || !friend) {
            res.status(404).json({ message: 'No user or friend with that id!' });
            return;
        }

        if (!user.friends.includes(friend._id as any)) {
            res.status(400).json({ message: 'Not friends!' });
            return;
        }

        user.friends = user.friends.filter((id: any) => !id.equals(friend._id));
        friend.friends = friend.friends.filter((id: any) => !id.equals(user._id));
        await user.save();
        await friend.save();

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
