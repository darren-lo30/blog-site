"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const Post_1 = __importDefault(require("@app/models/Post"));
const http_errors_1 = __importDefault(require("http-errors"));
const auth_1 = require("@app/auth");
const validatePostParams = () => [
    express_validator_1.body('title', 'A title is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    express_validator_1.body('body', 'A body for the post is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    express_validator_1.body('published', 'Post must either be published or unpublished')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .toBoolean(),
];
const setPost = (async (req, res, next) => {
    try {
        const queriedPost = await Post_1.default.findById(req.params.id)
            .populate('author')
            .populate({
            path: 'comments',
            populate: {
                path: 'author',
            },
        });
        if (!queriedPost) {
            return next(http_errors_1.default(404, 'Unable to find the blog post'));
        }
        res.locals.post = queriedPost;
    }
    catch (err) {
        return next(err);
    }
    return next();
});
/* ------------------------------- Controllers ------------------------------ */
exports.index = [
    (async (req, res, next) => {
        try {
            const allPosts = await Post_1.default.find({ published: true }).sort('-datePosted').populate('author').exec();
            return res.json({ posts: allPosts });
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports.show = [
    auth_1.authenticateUser,
    setPost,
    (async (req, res, next) => {
        const { post, currentUser } = res.locals;
        // Only allow owner or admin to view unpublished posts
        if (!post.published && !post.isAuthorized(currentUser)) {
            return res.status(401);
        }
        return res.json({ post });
    }),
];
exports.create = [
    auth_1.authenticateUser,
    validatePostParams(),
    (async (req, res, next) => {
        const { currentUser } = res.locals;
        const validationErrs = express_validator_1.validationResult(req);
        const post = new Post_1.default({
            author: currentUser,
            datePosted: new Date(),
            title: req.body.title,
            body: req.body.body,
            published: req.body.published,
        });
        if (!validationErrs.isEmpty()) {
            return res.status(422).json({ validationErrs, post });
        }
        try {
            await post.save();
            return res.status(201).json({ post });
        }
        catch (saveErr) {
            return res.status(500).json({ error: saveErr });
        }
    }),
];
exports.update = [
    auth_1.authenticateUser,
    setPost,
    validatePostParams(),
    (async (req, res, next) => {
        const { post } = res.locals;
        const validationErrs = express_validator_1.validationResult(req);
        post.title = req.body.title;
        post.body = req.body.body;
        post.published = req.body.published;
        if (!validationErrs.isEmpty()) {
            return res.status(422).json({ validationErrs, post });
        }
        try {
            await post.save();
            return res.status(200).json({ post });
        }
        catch (updateErr) {
            return res.json({ error: updateErr, post });
        }
    }),
];
exports.delete = [
    setPost,
    auth_1.authenticateUser,
    (async (req, res, next) => {
        const { post } = res.locals;
        try {
            await post.deleteOne();
            return res.status(200).json();
        }
        catch (deleteErr) {
            return next(deleteErr);
        }
    }),
];
exports.default = exports;
//# sourceMappingURL=postsController.js.map