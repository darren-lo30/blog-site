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
const Comment_1 = __importDefault(require("./Comment"));
const PostSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    datePosted: { type: Date, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    published: { type: Boolean, required: true },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });
PostSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'parentPost',
});
// Determines if a user is allowed to work on this Post
PostSchema.method('isAuthorized', function isAuthorized(user) {
    return user && (user.role === 'admin' || user._id.equals(this.author));
});
PostSchema.pre('deleteOne', async function onDelete() {
    // Delete all child comments
    await Comment_1.default.deleteMany({ parent: this._id });
});
exports.default = mongoose_1.default.model('Post', PostSchema);
//# sourceMappingURL=Post.js.map