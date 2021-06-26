import mongoose, { Schema, Document } from 'mongoose';
import { IAuthored } from './Authored';
import { IUser } from './User';

export const commentable = [
  'Post', 'Comment',
];

export interface IComment extends Document, IAuthored {
  datePosted: Date,
  message: string,
  parentPost: Schema.Types.ObjectId,
  parentComment?: Schema.Types.ObjectId,
}

const CommentSchema = new Schema<IComment>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  datePosted: { type: Date, required: true },
  message: { type: String, required: true },
  // If there is no parent, that means parent was deleted
  parentPost: { type: Schema.Types.ObjectId, refPath: 'Post', required: true },
  parentComment: { type: Schema.Types.ObjectId, refPath: 'Comment', required: false },
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

CommentSchema.method(
  'isAuthorized',
  function isAuthorized(user: IUser) {
    return user.role === 'admin' || user._id.equals(this.author);
  },
);

export default mongoose.model<IComment>('Comment', CommentSchema);
