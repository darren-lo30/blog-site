import User from '@app/models/User';
import Post from '@app/models/Post';
import Comment from '@app/models/Comment';

import { RequestHandler } from 'express';
import createError from 'http-errors';
import { body, validationResult } from 'express-validator';

import { verifyUser } from '@app/auth-middleware';

const getUser = (async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).exec();

    if (user == null) {
      return next(createError(404, 'User could not be found'));
    }
    res.locals.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
}) as RequestHandler;

const validateUserParams = () => [
  body('name', 'Name is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Email is required, not in use, and is in a valid format
  body('email')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email')
    // Validate that email is not in use by someone else
    .custom((value) => User.findOne({ email: value }).exec()
      .then((user) => {
        if (user) {
          throw new Error('Email is already in use by another account');
        }
        return true;
      }))
    .normalizeEmail()
    .toLowerCase(),
  body('username', 'Username is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be atleast 8 characters long')
    .escape(),
];

/* ----------------------------- Controllers ----------------------------- */

exports.index = [
  (async (req, res, next) => {
    try {
      const users = await User.find().exec();
      return res.json({ users });
    } catch (err) {
      return next(err);
    }
  }) as RequestHandler,
];

exports.show = [
  getUser,
  (async (req, res, next) => res.json({ user: res.locals.user })) as RequestHandler,
];

exports.create = [
  validateUserParams(),
  (async (req, res, next) => {
    const errors = validationResult(req);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: 'standard',
    });

    if (!errors.isEmpty()) {
      return res.json({ errors, user });
    }

    // Create a hashed password for the user
    try {
      await user.save();
      res.locals.createdUser = user;
      return next();
    } catch (err) {
      return next(err);
    }
  }) as RequestHandler,
];

exports.update = [
  getUser,
  validateUserParams(),
  (async (req, res, next) => {
  }) as RequestHandler,
];

exports.delete = [
  verifyUser,
  (async (req, res, next) => {
    const { user, currentUser } = res.locals;
    if (user.equals(currentUser)) {
      // Delete all posts and comments made by user
      const userComments = await Comment.find({ author: user._id }).exec();
      const userPosts = await Post.find({ author: user._id }).exec();

      // Fix posts and comments referencing this user
      await Promise.all(
        userComments.map(async (deletedComment) => {
          // Find all comments with references to this comment and remove the reference
          const childComments = await Comment.find({ parent: deletedComment._id }).exec();
          Promise.all(
            childComments.map((childComment) => {
              childComment.parent = undefined;
              return childComment.save();
            }),
          );
          // Delete comment
          Comment.findByIdAndDelete(user._id).exec();
        }).concat(
          userPosts.map(async (deletedPost) => {
            Post.findByIdAndDelete(deletedPost._id).exec();
          }),
        ),
      );

      // Delete user and logout
      await User.findByIdAndDelete(user._id).exec();
    }
    return next(createError(401, 'Unable to delete other users'));
  }) as RequestHandler,
];
export default exports;
