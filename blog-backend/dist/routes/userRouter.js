"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("@app/controllers/userController"));
const router = express_1.default.Router();
/* ------------------------------- User routes ------------------------------ */
router.get('/users', userController_1.default.index);
router.get('/users/:id', userController_1.default.show);
router.post('/users/:id', userController_1.default.create);
router.put('/users/:id', userController_1.default.update);
router.delete('/users/:id', userController_1.default.delete);
exports.default = router;
//# sourceMappingURL=userRouter.js.map