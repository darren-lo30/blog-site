import { RequestHandler } from 'express';
import passport from 'passport';

// Restricts the access of other users
export const verifyUser = (async (req, res, next) => {
  const { user, currentUser } = res.locals;
  if (!currentUser.equals(user)) {
    return res.status(403).json({
      message: 'Unable to access other user\'s data',
    });
  }
  return next();
}) as RequestHandler;

// Restricts access of users that are not logged in
export const authenticateUser = (async (req, res, next) => {
  const { currentUser } = res.locals;
  if (!currentUser) {
    return res.status(403).json();
  }
  return next();
}) as RequestHandler;
