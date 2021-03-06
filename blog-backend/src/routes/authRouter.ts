import express from 'express';

import passport from 'passport';
import usersController from '@app/controllers/usersController';
import { generateToken } from '@app/auth';

const router = express.Router();

/* --------------------------------- Sign up -------------------------------- */
router.post('/sign-up', usersController.create, async (req, res, next) => {
  // After creating the user, initiate sign in
  const { createdUser } = res.locals;
  // Send user token and their information
  return res.cookie('token', generateToken(createdUser), {
    sameSite: 'none', secure: true, path: '/', httpOnly: true,
  }).json({ user: createdUser });
});

/* --------------------------------- Sign in -------------------------------- */
router.post(['/sign-in', '/log-in'], (req, res, next) => {
  passport.authenticate('local', { session: true }, (authErr, user, info) => {
    if (authErr || !user) {
      console.log(authErr);
      console.log(user);
      return res.status(401).json({
        msg: 'Unable to login',
      });
    }
    // Send back token to user
    return res.cookie('token', generateToken(user), {
      sameSite: 'none', secure: true, path: '/', httpOnly: true,
    }).json({ user });
  })(req, res);
});

router.post(['/sign-out', '/log-out'], (req, res, next) => res.clearCookie('token').end());

// Used by front end to check if the user has a jwt token stored
router.post('/auth', (req, res, next) => {
  res.json({ user: res.locals.currentUser });
});

export default router;
