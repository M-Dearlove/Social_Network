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
exports.removeFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getSingleUser = exports.getUsers = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_js_1.default.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUsers = getUsers;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_js_1.default.findOne({ _id: req.params.userId })
            .select('-__v');
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getSingleUser = getSingleUser;
// create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUserData = yield User_js_1.default.create(req.body);
        res.json(dbUserData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createUser = createUser;
// update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUserData = yield User_js_1.default.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true, runValidators: true });
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.json(dbUserData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateUser = updateUser;
// delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUserData = yield User_js_1.default.findOneAndDelete({ _id: req.params.userId });
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.json(dbUserData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteUser = deleteUser;
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_js_1.default.findById(req.params.userId);
        const friend = yield User_js_1.default.findById(req.params.friendId);
        if (!user || !friend) {
            res.status(404).json({ message: 'No user or friend with that id!' });
            return;
        }
        if (user.friends.includes(friend._id)) {
            res.status(400).json({ message: 'Already friends!' });
            return;
        }
        user.friends.push(friend._id);
        friend.friends.push(user._id);
        yield user.save();
        yield friend.save();
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.addFriend = addFriend;
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_js_1.default.findById(req.params.userId);
        const friend = yield User_js_1.default.findById(req.params.friendId);
        if (!user || !friend) {
            res.status(404).json({ message: 'No user or friend with that id!' });
            return;
        }
        if (!user.friends.includes(friend._id)) {
            res.status(400).json({ message: 'Not friends!' });
            return;
        }
        user.friends = user.friends.filter((id) => !id.equals(friend._id));
        friend.friends = friend.friends.filter((id) => !id.equals(user._id));
        yield user.save();
        yield friend.save();
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.removeFriend = removeFriend;
