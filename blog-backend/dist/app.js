"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
require("./config");
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const postsRouter_1 = __importDefault(require("./routes/postsRouter"));
const commentsRouter_1 = __importDefault(require("./routes/commentsRouter"));
const cors_1 = __importDefault(require("cors"));
// Set up pasport
require("./passport-init");
const app = express_1.default();
// Set up express middleware
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(cors_1.default({ credentials: true, origin: process.env.FRONT_END_URL }));
/* ----------------------------- Mongoose setup ----------------------------- */
// Connect to database
const mongoDBURI = process.env.DATABASE_URI;
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose_1.default.connection;
/* eslint-disable no-console */
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.on('connected', () => { console.log('Connected succesfully'); });
/* eslint-enable no-console */
/* ----------------------------- Passport setup ----------------------------- */
// Set current user from JWT token
app.use('/', async (req, res, next) => {
    await passport_1.default.authenticate('jwt', { session: false }, (err, user, info) => {
        if (user) {
            res.locals.currentUser = user;
        }
        next();
    })(req, res);
});
/* --------------------------------- Routes --------------------------------- */
app.use('/', authRouter_1.default);
app.use('/', indexRouter_1.default);
app.use('/posts', postsRouter_1.default);
app.use('/users', usersRouter_1.default);
app.use('/comments', commentsRouter_1.default);
// catch 404 and forward to error handler
// This is skipped if err exists
app.use((req, res, next) => {
    next(http_errors_1.default(404));
});
// error handler
// You need next or else error handling middleware will not run
// Extracts error data and sends as json
app.use(((err, req, res, next) => res.status(err.status || 500).json({
    message: err.message,
})));
exports.default = app;
//# sourceMappingURL=app.js.map