import User from '@app/models/User';
import Post from '@app/models/Post';
import Comment from '@app/models/Comment';

import { RequestHandler } from 'express';
import createError from 'http-errors';

const getUser = (async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).exec();

    if (user == null) {
      return next(createError(404, 'User could not be found'));
    }
    res.locals.user = user;
    return user;
  } catch (err) {
    return next(err);
  }
}) as RequestHandler;

/* ----------------------------- Controllers ----------------------------- */

exports.index = [
  (async (req, res, next) => {
    try {
      const users = await User.find().exec();
      return res.json(users);
    } catch (err) {
      return next(err);
    }
  }) as RequestHandler,
];

exports.show = [
  getUser,
  (async (req, res, next) => res.json(res.locals.user)) as RequestHandler,
];

exports.create = (async (req, res, next) => {
}) as RequestHandler;

exports.update = [
  getUser,
  (async (req, res, next) => {
  }) as RequestHandler,
];

exports.delete = (async (req, res, next) => {
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
}) as RequestHandler;

export default exports;
