"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsController_1 = __importDefault(require("@app/controllers/postsController"));
const router = express_1.default.Router();
/* ------------------------------- User routes ------------------------------ */
router.get('/', postsController_1.default.index);
router.post('/', postsController_1.default.create);
router.get('/:id', postsController_1.default.show);
router.put('/:id', postsController_1.default.update);
router.delete('/:id', postsController_1.default.delete);
exports.default = router;
//# sourceMappingURL=postsRouter.js.map