"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.authenticateUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Restricts access of users that are not logged in
exports.authenticateUser = (async (req, res, next) => {
    const { currentUser } = res.locals;
    if (!currentUser) {
        return next(http_errors_1.default(401));
    }
    return next();
});
function generateToken(user) {
    return jsonwebtoken_1.default.sign(user.toJSON(), process.env.JWT_SECRET);
}
exports.generateToken = generateToken;
//# sourceMappingURL=auth.js.map