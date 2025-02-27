"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReaction = exports.addReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getSingleThought = exports.getThoughts = void 0;
const Thought_js_1 = __importDefault(require("../models/Thought.js"));
const User_js_1 = __importDefault(require("../models/User.js"));
const getThoughts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Thought_js_1.default.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getThoughts = getThoughts;
const getSingleThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Thought_js_1.default.findOne({ _id: req.params.userId })
            .select('-__v');
        if (!user) {
            res.status(404).json({ message: 'No thought with that ID' });
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getSingleThought = getSingleThought;
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_js_1.default.create(req.body);
        yield User_js_1.default.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: thought._id } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createThought = createThought;
const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_js_1.default.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateThought = updateThought;
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_js_1.default.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteThought = deleteThought;
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_js_1.default.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought with that id!' });
            return;
        }
        thought.reactions.push(req.body);
        yield thought.save();
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.addReaction = addReaction;
const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_js_1.default.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that id!' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.removeReaction = removeReaction;
