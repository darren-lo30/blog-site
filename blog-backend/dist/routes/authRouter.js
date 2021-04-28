"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
/* --------------------------------- Sign up -------------------------------- */
router.post('sign-up', (req, res, next) => {
});
/* --------------------------------- Sign in -------------------------------- */
router.post(['/sign-in', '/log-in'], (req, res, next) => {
    passport_1.default.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Unable to login',
                user: user,
            });
        }
    });
});
exports.default = router;
//# sourceMappingURL=authRouter.js.map