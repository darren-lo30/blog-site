import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import Post from '@app/models/Post';
import createError from 'http-errors';
import { authenticateUser } from '@app/auth';

const validatePostParams = () => [
  body('title', 'A title is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('body', 'A body for the post is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
];

const setPost = (async (req, res, next) => {
  try {
    const queriedPost = await Post.findById(req.params.id)
      .populate('author')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
        },
      });

    if (!queriedPost) {
      return next(createError(404, 'Unable to find the blog post'));
    }

    res.locals.post = queriedPost;
  } catch (err) {
    return next(err);
  }
  return next();
}) as RequestHandler;

/* ------------------------------- Controllers ------------------------------ */
exports.index = [
  (async (req, res, next) => {
    try {
      const allPosts = await Post.find().sort('-datePosted').populate('author').exec();
      return res.json({ posts: allPosts });
    } catch (err) {
      return next(err);
    }
  }) as RequestHandler,
];

exports.show = [
  setPost,
  (async (req, res, next) => {
    res.json({ post: res.locals.post });
  }) as RequestHandler,
];

exports.create = [
  authenticateUser,
  validatePostParams(),
  (async (req, res, next) => {
    const { currentUser } = res.locals;
    const validationErrs = validationResult(req);

    const post = new Post({
      author: currentUser,
      datePosted: new Date(),
      title: req.body.title,
      body: req.body.body,
    });

    if (!validationErrs.isEmpty()) {
      return res.status(422).json({ validationErrs, post });
    }

    try {
      await post.save();
      return res.status(201).json({ post });
    } catch (saveErr) {
      return res.status(500).json({ error: saveErr });
    }
  }) as RequestHandler,
];

exports.update = [
  authenticateUser,
  setPost,
  validatePostParams(),
  (async (req, res, next) => {
    const { post } = res.locals;
    const validationErrs = validationResult(req);

    post.title = req.body.title;
    post.body = req.body.body;

    if (!validationErrs.isEmpty()) {
      return res.status(422).json({ validationErrs, post });
    }

    try {
      await post.save();
      return res.status(200).json({ post });
    } catch (updateErr) {
      return res.json({ error: updateErr, post });
    }
  }) as RequestHandler,
];

exports.delete = [
  setPost,
  authenticateUser,
  (async (req, res, next) => {
    const { post } = res.locals;
    try {
      await post.deleteOne();
      return res.status(200).json();
    } catch (deleteErr) {
      return next(deleteErr);
    }
  }) as RequestHandler,
];

export default exports;
