"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("@app/models/User"));
const Post_1 = __importDefault(require("@app/models/Post"));
const Comment_1 = __importDefault(require("@app/models/Comment"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_middleware_1 = require("@app/auth-middleware");
const getUser = (async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.params.id).exec();
        if (user == null) {
            return next(http_errors_1.default(404, 'User could not be found'));
        }
        res.locals.user = user;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
const validateUserParams = () => [
    express_validator_1.body('name', 'Name is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    // Email is required, not in use, and is in a valid format
    express_validator_1.body('email')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .custom((value) => User_1.default.find({ email: value }).exec()
        .then((user) => (user ? new Error('Email is already in user') : true)))
        .normalizeEmail()
        .toLowerCase(),
    express_validator_1.body('username', 'Username is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    express_validator_1.body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password must be atleast 8 characters long')
        .escape(),
];
/* ----------------------------- Controllers ----------------------------- */
exports.index = [
    (async (req, res, next) => {
        try {
            const users = await User_1.default.find().exec();
            return res.json({ users });
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports.show = [
    getUser,
    (async (req, res, next) => res.json({ user: res.locals.user })),
];
exports.create = [
    validateUserParams,
    (async (req, res, next) => {
        const errors = express_validator_1.validationResult(req);
        const user = new User_1.default({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            role: 'standard',
        });
        if (errors) {
            return res.json({ errors, user });
        }
        // Create a hashed password for the user
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 10);
        user.password = hashedPassword;
        try {
            await user.save();
            return res.json({ user });
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports.update = [
    getUser,
    validateUserParams,
    (async (req, res, next) => {
    }),
];
exports.delete = [
    auth_middleware_1.verifyUser,
    (async (req, res, next) => {
        const { user, currentUser } = res.locals;
        if (user.equals(currentUser)) {
            // Delete all posts and comments made by user
            const userComments = await Comment_1.default.find({ author: user._id }).exec();
            const userPosts = await Post_1.default.find({ author: user._id }).exec();
            // Fix posts and comments referencing this user
            await Promise.all(userComments.map(async (deletedComment) => {
                // Find all comments with references to this comment and remove the reference
                const childComments = await Comment_1.default.find({ parent: deletedComment._id }).exec();
                Promise.all(childComments.map((childComment) => {
                    childComment.parent = undefined;
                    return childComment.save();
                }));
                // Delete comment
                Comment_1.default.findByIdAndDelete(user._id).exec();
            }).concat(userPosts.map(async (deletedPost) => {
                Post_1.default.findByIdAndDelete(deletedPost._id).exec();
            })));
            // Delete user and logout
            await User_1.default.findByIdAndDelete(user._id).exec();
        }
        return next(http_errors_1.default(401, 'Unable to delete other users'));
    }),
];
exports.default = exports;
//# sourceMappingURL=userController.js.map