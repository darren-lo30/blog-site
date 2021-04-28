import passport from 'passport';
import passportLocal from 'passport-local';
import User, { IUser } from '@app/models/User';
import { NativeError } from 'mongoose';

import passportJWT from 'passport-jwt';

// Set up passport login authentication
const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy({
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!(await user.isValidPassword(password))) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// Set up passport session authentication to keep user logged in
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
  try {
    const user = await User.findById(token._id);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser<any, any>((req, user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  User.findById(id, (err: NativeError, user: IUser) => done(err, user));
});
