"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = __importDefault(require("@app/models/Comment"));
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const auth_1 = require("@app/auth");
const validateCommentParams = () => [
    express_validator_1.body('message')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Message is required'),
    express_validator_1.body('parentComment')
        .trim(),
];
const setComment = (async (req, res, next) => {
    // Finds the request comment from the URL
    try {
        const comment = await Comment_1.default.findById(req.params.id).populate('author');
        if (!comment) {
            return next(http_errors_1.default(404, 'Comment was not found'));
        }
        return next();
    }
    catch (err) {
        return next(err);
    }
});
/* ------------------------------- Controllers ------------------------------ */
exports.create = [
    auth_1.authenticateUser,
    validateCommentParams(),
    (async (req, res, next) => {
        const { currentUser } = res.locals;
        const validationErrs = express_validator_1.validationResult(req);
        const comment = new Comment_1.default({
            author: currentUser,
            datePosted: new Date(),
            message: req.body.message,
            parentPost: req.params.parentId,
            ...(req.body.parentComment && { parentComment: req.body.parentComment }),
        });
        if (!validationErrs.isEmpty()) {
            return res.status(422).json({ validationErrs, comment });
        }
        try {
            await comment.save();
            return res.json({ comment });
        }
        catch (saveErr) {
            return next(saveErr);
        }
    }),
];
exports.update = [
    auth_1.authenticateUser,
    setComment,
    validateCommentParams(),
    (async (req, res, next) => {
        const { comment, currentUser } = res.locals;
        // Only the author of the comment or admin can edit their own comments
        if (!comment.isAuthorized(currentUser)) {
            return res.status(401);
        }
        const validationErrs = express_validator_1.validationResult(req);
        comment.message = req.body.message;
        if (!validationErrs.isEmpty()) {
            return res.json({ validationErrs, comment });
        }
        try {
            await comment.save();
            return res.status(200).json({ comment });
        }
        catch (updateErr) {
            return next(updateErr);
        }
    }),
];
exports.delete = [
    auth_1.authenticateUser,
    setComment,
    (async (req, res, next) => {
        const { comment, currentUser } = res.locals;
        // Only the author of the comment or admin can delete their own comments
        if (!comment.isAuthorized(currentUser)) {
            return res.status(401);
        }
        try {
            await comment.deleteOne();
            return res.status(200).json();
        }
        catch (deleteErr) {
            return next(deleteErr);
        }
    }),
];
exports.default = exports;
//# sourceMappingURL=commentsController.js.map