"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const router = express_1.default.Router();
/* ------------------------------- User routes ------------------------------ */
// User create function is aliased sign up in the authRouter
router.get('/', usersController_1.default.index);
router.get('/:id', usersController_1.default.show);
router.put('/:id', usersController_1.default.update);
router.delete('/:id', usersController_1.default.delete);
exports.default = router;
//# sourceMappingURL=usersRouter.js.map