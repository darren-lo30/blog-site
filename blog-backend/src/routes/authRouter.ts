import express from 'express';

import passport from 'passport';
import jwt from 'jsonwebtoken';
import { IUser } from '@app/models/User';
import usersController from '@app/controllers/usersController';

const router = express.Router();

function generateToken(user: IUser) {
  return jwt.sign(user.toJSON(), process.env.JWT_SECRET!);
}

/* --------------------------------- Sign up -------------------------------- */
router.post('/sign-up', usersController.create, async (req, res, next) => {
  // After creating the user, initiate sign in
  const { createdUser } = res.locals;
  // Send user token and their information
  return res.json({ user: createdUser, token: generateToken(createdUser) });
});

/* --------------------------------- Sign in -------------------------------- */
router.post(['/sign-in', '/log-in'], (req, res, next) => {
  passport.authenticate('local', { session: false }, (authErr, user, info) => {
    if (authErr || !user) {
      return res.status(401).json({
        message: 'Unable to login',
        user,
      });
    }
    // Send back token to user
    return res.json({ user, token: generateToken(user) });
  })(req, res);
});

export default router;
