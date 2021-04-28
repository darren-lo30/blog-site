"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.verifyUser = void 0;
// Restricts the access of other users
exports.verifyUser = (async (req, res, next) => {
    const { user, currentUser } = res.locals;
    if (!currentUser.equals(user)) {
        return res.status(403).json({
            message: 'Unable to access other user\'s data',
        });
    }
    return next();
});
// Restricts access of users that are not logged in
exports.authenticateUser = (async (req, res, next) => {
    const { currentUser } = res.locals;
    if (!currentUser) {
        return res.status(403).json();
    }
    return next();
});
//# sourceMappingURL=auth-middleware.js.map