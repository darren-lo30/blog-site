import User from '@app/models/User';

import { RequestHandler } from 'express';
import createError from 'http-errors';
import { body, validationResult } from 'express-validator';
import { authenticateUser, generateToken } from '@app/auth';

const getUser = (async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('posts')
      .populate('comments');

    if (!user) {
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
    .custom(async (value, { req }) => {
      const userWithEmail = await User.findOne({ email: value }).exec();
      if (userWithEmail && !userWithEmail._id.equals(req?.params?.id)) {
        // A user with that email and that is not the current user has that email
        throw new Error('Email is already in use by another account');
      }
      return true;
    })
    .normalizeEmail({ gmail_remove_dots: false })
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

const verifyUser = (async (req, res, next) => {
  const { user, currentUser } = res.locals;
  if (!currentUser.equals(user)) {
    return res.status(403).json({
      message: 'Unable to access other user\'s data',
    });
  }
  return next();
}) as RequestHandler;

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
  (async (req, res, next) => {
    const { user } = res.locals;
    user.password = null;
    return res.json({ user });
  }) as RequestHandler,
];

exports.create = [
  validateUserParams(),
  (async (req, res, next) => {
    const validationErrs = validationResult(req);
    const user = new User({
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
    } catch (err) {
      return next(err);
    }
  }) as RequestHandler,
];

exports.update = [
  getUser,
  authenticateUser,
  verifyUser,
  validateUserParams(),
  (async (req, res, next) => {
    const validationErrs = validationResult(req);
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
      return res.json({ user, token: generateToken(user!) });
    } catch (updateErr) {
      return next(updateErr);
    }
  }) as RequestHandler,
];

exports.delete = [
  getUser,
  authenticateUser,
  verifyUser,
  (async (req, res, next) => {
    const { user } = res.locals;
    try {
      await user.deleteOne();
      return res.status(200).json();
    } catch (deleteErr) {
      return next(deleteErr);
    }
  }) as RequestHandler,
];
export default exports;
