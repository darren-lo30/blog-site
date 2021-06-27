"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const User_1 = __importDefault(require("@app/models/User"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
// Set up passport login authentication
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
        const user = await User_1.default.findOne({ email: email.toLowerCase() });
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        if (!(await user.isValidPassword(password))) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}));
// Set up passport session authentication to keep user logged in
const JWTStrategy = passport_jwt_1.default.Strategy;
// Method to extract JWT token from httpOnly cookie being sent
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.token;
    }
    return token;
};
passport_1.default.use(new JWTStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: cookieExtractor,
}, async (token, done) => {
    try {
        const user = await User_1.default.findById(token._id);
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}));
passport_1.default.serializeUser((req, user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(async (id, done) => {
    User_1.default.findById(id, (err, user) => done(err, user));
});
//# sourceMappingURL=passport-init.js.map