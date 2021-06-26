import { RequestHandler } from 'express';
import { IUser } from '@app/models/User';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

// Restricts access of users that are not logged in
export const authenticateUser = (async (req, res, next) => {
  const { currentUser } = res.locals;
  if (!currentUser) {
    return next(createError(401));
  }
  return next();
}) as RequestHandler;

export function generateToken(user: IUser) {
  return jwt.sign(user.toJSON(), process.env.JWT_SECRET!);
}
