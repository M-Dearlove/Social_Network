import mongoose from 'mongoose';
import { User, Thought } from '../models';

const seedDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/socialNetwork');

        await User.deleteMany({});
        await Thought.deleteMany({});

        const users = await User.insertMany([
            { username: 'Matt', email: 'matt@example.com' },
            { username: 'Kelly', email: 'kelly@example.com' },
        ]);

        const thoughts = await Thought.insertMany([
            { thoughtText: 'What a neat contraption!', username: 'Matt' },
            { thoughtText: 'I love this website so much', username: 'Kelly' },
        ]);

        await User.findByIdAndUpdate(users[0]._id, { $push: { thoughts: thoughts[0]._id } });
        await User.findByIdAndUpdate(users[1]._id, { $push: { thoughts: thoughts[1]._id } });

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedDatabase();