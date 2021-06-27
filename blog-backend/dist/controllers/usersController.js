"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("@app/models/User"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_validator_1 = require("express-validator");
const auth_1 = require("@app/auth");
const getUser = (async (req, res, next) => {
    const { currentUser } = res.locals;
    try {
        const userQuery = User_1.default.findById(req.params.id).populate('comments');
        // Populate with both published and unpublished posts if the currentUser is an admin
        if (currentUser && currentUser._id.equals(req.params.id)) {
            userQuery.populate('posts');
        }
        else {
            userQuery.populate({ path: 'posts', match: { published: true } });
        }
        // Query the user
        const user = await userQuery;
        if (!user) {
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
        // Validate that email is not in use by someone else
        .custom(async (value, { req }) => {
        var _a;
        const userWithEmail = await User_1.default.findOne({ email: value }).exec();
        if (userWithEmail && !userWithEmail._id.equals((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id)) {
            // A user with that email and that is not the current user has that email
            throw new Error('Email is already in use by another account');
        }
        return true;
    })
        .normalizeEmail({ gmail_remove_dots: false })
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
const verifyUser = (async (req, res, next) => {
    const { user, currentUser } = res.locals;
    if (!currentUser.equals(user)) {
        return res.status(403).json({
            message: 'Unable to access other user\'s data',
        });
    }
    return next();
});
/* ----------------------------- Controllers ----------------------------- */
exports.index = [
    auth_1.authenticateUser,
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
    auth_1.authenticateUser,
    getUser,
    (async (req, res, next) => {
        const { user } = res.locals;
        user.password = null;
        return res.json({ user });
    }),
];
exports.create = [
    validateUserParams(),
    (async (req, res, next) => {
        const validationErrs = express_validator_1.validationResult(req);
        const user = new User_1.default({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            role: 'standard',
        });
        if (!validationErrs.isEmpty()) {
            return res.status(422).json({ validationErrs, user });
        }
        // Create a hashed password for the user
        try {
            await user.save();
            res.locals.createdUser = user;
            return next();
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports.update = [
    getUser,
    auth_1.authenticateUser,
    verifyUser,
    validateUserParams(),
    (async (req, res, next) => {
        const validationErrs = express_validator_1.validationResult(req);
        const { user } = res.locals;
        // Update properties
        user.name = req.body.name;
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        if (!validationErrs.isEmpty()) {
            return res.status(422).json({ user, validationErrs });
        }
        try {
            await user.save();
            return res.cookie('token', auth_1.generateToken(user), { sameSite: 'strict', path: '/', httpOnly: true }).json({ user });
        }
        catch (updateErr) {
            return next(updateErr);
        }
    }),
];
exports.delete = [
    getUser,
    auth_1.authenticateUser,
    verifyUser,
    (async (req, res, next) => {
        const { user } = res.locals;
        try {
            await user.deleteOne();
            return res.status(200).json();
        }
        catch (deleteErr) {
            return next(deleteErr);
        }
    }),
];
exports.default = exports;
//# sourceMappingURL=usersController.js.map