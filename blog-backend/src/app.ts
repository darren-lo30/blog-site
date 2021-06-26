import 'module-alias/register';
import express, { ErrorRequestHandler } from 'express';

import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import mongoose from 'mongoose';
import passport from 'passport';

import '@app/config';

import indexRouter from '@app/routes/indexRouter';
import usersRouter from '@app/routes/usersRouter';
import authRouter from '@app/routes/authRouter';
import postsRouter from '@app/routes/postsRouter';
import commentsRouter from '@app/routes/commentsRouter';
import cors from 'cors';

// Set up pasport
import '@app/passport-init';

const app = express();

// Set up express middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

/* ----------------------------- Mongoose setup ----------------------------- */
// Connect to database
const mongoDBURI = process.env.DATABASE_URI as string;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
/* eslint-disable no-console */
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.on('connected', () => { console.log('Connected succesfully'); });
/* eslint-enable no-console */

/* ----------------------------- Passport setup ----------------------------- */
// Set current user from JWT token
app.use('/', async (req, res, next) => {
  await passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      res.locals.currentUser = user;
    }
    next();
  })(req, res);
});

/* --------------------------------- Routes --------------------------------- */
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
// catch 404 and forward to error handler
// This is skipped if err exists
app.use((req, res, next) => {
  next(createError(404));
});

// error handler

// You need next or else error handling middleware will not run
// Extracts error data and sends as json
app.use(((err, req, res, next) => res.status(err.status || 500).json({
  message: err.message,
})) as ErrorRequestHandler);

export default app;
