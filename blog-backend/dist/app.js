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
const dotenv_1 = __importDefault(require("dotenv"));
const indexRouter_1 = __importDefault(require("@app/routes/indexRouter"));
// Set up pasport
require("@app/authentication");
dotenv_1.default.config();
const app = express_1.default();
// Set up middle ware
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Connect to database
mongoose_1.default.set('useFindAndModify', false);
const mongoDBURI = process.env.DATABASE_URI;
mongoose_1.default.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose_1.default.connection;
/* eslint-disable no-console */
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.on('connected', () => { console.log('Connected succesfully'); });
/* eslint-enable no-console */
// Set current user if they are already logged in
// app.use('/', );
// Set up routing
app.use('/', indexRouter_1.default);
// catch 404 and forward to error handler
// This is skipped if err exists
app.use((req, res, next) => {
    next(http_errors_1.default(404));
});
// error handler
// You need next or else error handling middleware will not run
// Extracts error data and sends as json
app.use(((err, req, res, next) => res.status(err.status).json({
    message: err.message,
})));
exports.default = app;
//# sourceMappingURL=app.js.map