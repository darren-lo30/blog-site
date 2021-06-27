"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentsController_1 = __importDefault(require("../controllers/commentsController"));
const router = express_1.default.Router();
/* ------------------------------- User routes ------------------------------ */
router.post('/:parentId', commentsController_1.default.create);
router.put('/:id', commentsController_1.default.update);
router.delete('/:id', commentsController_1.default.delete);
exports.default = router;
//# sourceMappingURL=commentsRouter.js.map