import { Schema, Document, model, ObjectId, Types } from 'mongoose';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: ObjectId[]
};

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt: Date) => createdAt
    }
});

const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        get: (createdAt: Date) => createdAt
    }, 
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;