"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./models/User"));
dotenv_1.default.config();
(async () => {
    const prevAdmin = await User_1.default.findOne({ email: process.env.ADMIN_EMAIL });
    if (!prevAdmin) {
        const admin = new User_1.default({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD,
            role: 'admin',
        });
        admin.save();
    }
})();
//# sourceMappingURL=config.js.map