import Thought from '../models/Thought.js';
import User from '../models/User.js';
import { Request, Response } from 'express';

export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const users = await Thought.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const user = await Thought.findOne({ _id: req.params.userId })
            .select('-__v');

        if (!user) {
            res.status(404).json({ message: 'No thought with that ID' });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);

        await User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}