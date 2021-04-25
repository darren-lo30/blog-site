import express, { ErrorRequestHandler } from 'express';

import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';

import 'module-alias/register';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import indexRouter from '@app/routes/index';

dotenv.config();

const app = express();

// Set up middle ware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
const mongoDBURI = process.env.DATABASE_URI as string;
mongoose.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
/* eslint-disable no-console */
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.on('connected', () => { console.log('Connected succesfully'); });
/* eslint-enable no-console */

// Set current user if they are already logged in
// app.use('/', );

// Set up routing
app.use('/', indexRouter);

// catch 404 and forward to error handler
// This is skipped if err exists
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// You need next or else error handling middleware will not run
app.use(((err, req, res, next) => res.json(err)) as ErrorRequestHandler);

export default app;
