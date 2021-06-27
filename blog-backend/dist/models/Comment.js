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
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentable = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.commentable = [
    'Post', 'Comment',
];
const CommentSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    datePosted: { type: Date, required: true },
    message: { type: String, required: true },
    // If there is no parent, that means parent was deleted
    parentPost: { type: mongoose_1.Schema.Types.ObjectId, refPath: 'Post', required: true },
    parentComment: { type: mongoose_1.Schema.Types.ObjectId, refPath: 'Comment', required: false },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });
// CommentSchema.pre<IComment>(
//   'deleteOne',
//   async function onDelete() {
//     // Change references of child comments to delete comment to undefined
//     const childComments = await mongoose.models.Comment.findOne({ parent: this._id }).exec();
//     await Promise.all(
//       childComments.map((childComment: IComment) => childComment.save()),
//     );
//   },
// );
CommentSchema.method('isAuthorized', function isAuthorized(user) {
    return user.role === 'admin' || user._id.equals(this.author);
});
exports.default = mongoose_1.default.model('Comment', CommentSchema);
//# sourceMappingURL=Comment.js.map