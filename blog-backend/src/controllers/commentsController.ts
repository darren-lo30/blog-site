import { RequestHandler } from 'express';
import Comment, { commentable } from '@app/models/Comment';
import { body, validationResult } from 'express-validator';
import createError from 'http-errors';
import { authenticateUser } from '@app/auth';
import capitalize from 'capitalize';

const validateCommentParams = () => [
  body('message')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Message is required'),
  body('parentComment')
    .trim(),
];

const setComment = (async (req, res, next) => {
  // Finds the request comment from the URL
  try {
    const comment = await Comment.findById(req.params.id).populate('author');
    if (!comment) {
      return next(createError(404, 'Comment was not found'));
    }

    return next();
  } catch (err) {
    return next(err);
  }
}) as RequestHandler;

/* ------------------------------- Controllers ------------------------------ */
exports.create = [
  authenticateUser,
  validateCommentParams(),
  (async (req, res, next) => {
    const { currentUser } = res.locals;
    const validationErrs = validationResult(req);

    const comment = new Comment({
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
    } catch (saveErr) {
      return next(saveErr);
    }
  }) as RequestHandler,
];

exports.update = [
  authenticateUser,
  setComment,
  validateCommentParams(),
  (async (req, res, next) => {
    const { comment } = res.locals;
    const validationErrs = validationResult(req);

    comment.message = req.body.message;

    if (!validationErrs.isEmpty()) {
      return res.json({ validationErrs, comment });
    }

    try {
      await comment.save();
      return res.status(200).json({ comment });
    } catch (updateErr) {
      return next(updateErr);
    }
  }) as RequestHandler,
];

exports.delete = [
  authenticateUser,
  setComment,
  (async (req, res, next) => {
    const { comment } = res.locals;
    try {
      await comment.deleteOne();
      return res.status(200).json();
    } catch (deleteErr) {
      return next(deleteErr);
    }
  }) as RequestHandler,
];

export default exports;
