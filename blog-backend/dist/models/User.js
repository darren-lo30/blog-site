"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Post_1 = __importDefault(require("./Post"));
const Comment_1 = __importDefault(require("./Comment"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'standard'] },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });
/* --------------------------- Virtual Properties --------------------------- */
UserSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author',
    options: { sort: { datePosted: -1 } },
});
UserSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'author',
    options: { sort: { datePosted: -1 } },
});
UserSchema.method('isValidPassword', async function isValidPassword(password) {
    const isValid = await bcryptjs_1.default.compare(password, this.password);
    return isValid;
});
/* ---------------------------------- Hooks --------------------------------- */
UserSchema.pre('save', async function encryptPassword() {
    if (!this.isModified('password')) {
        return;
    }
    const hashedPassword = await bcryptjs_1.default.hash(this.password, 10);
    this.password = hashedPassword;
});
// Delete any related models on user deletion
UserSchema.pre(['deleteOne'], { document: true, query: false }, async function onDelete() {
    await Post_1.default.deleteMany({ author: this._id });
    await Comment_1.default.deleteMany({ author: this._id });
});
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map