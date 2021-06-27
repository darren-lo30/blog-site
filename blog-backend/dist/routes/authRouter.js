"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const auth_1 = require("../auth");
const router = express_1.default.Router();
/* --------------------------------- Sign up -------------------------------- */
router.post('/sign-up', usersController_1.default.create, async (req, res, next) => {
    // After creating the user, initiate sign in
    const { createdUser } = res.locals;
    // Send user token and their information
    return res.cookie('token', auth_1.generateToken(createdUser), { sameSite: 'strict', path: '/', httpOnly: true }).json({ user: createdUser });
});
/* --------------------------------- Sign in -------------------------------- */
router.post(['/sign-in', '/log-in'], (req, res, next) => {
    passport_1.default.authenticate('local', { session: false }, (authErr, user, info) => {
        if (authErr || !user) {
            return res.status(401).json({
                msg: 'Unable to login',
            });
        }
        // Send back token to user
        return res.cookie('token', auth_1.generateToken(user), { sameSite: 'strict', path: '/', httpOnly: true }).json({ user });
    })(req, res);
});
router.post(['/sign-out', '/log-out'], (req, res, next) => res.clearCookie('token').end());
// Used by front end to check if the user has a jwt token stored
router.post('/auth', (req, res, next) => {
    res.json({ user: res.locals.currentUser });
});
exports.default = router;
//# sourceMappingURL=authRouter.js.map