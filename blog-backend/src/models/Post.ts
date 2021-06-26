import mongoose, { Schema, Document } from 'mongoose';
import Comment from './Comment';
import { IUser } from './User';
import { IAuthored } from './Authored';

export interface IPost extends Document, IAuthored {
  datePosted: Date,
  title: string,
  body: string
}

const PostSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  datePosted: { type: Date, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
});

// Determines if a user is allowed to work on this Post
PostSchema.method(
  'isAuthorized',
  function isAuthorized(user: IUser) {
    return user.role === 'admin' || user._id.equals(this.author);
  },
);

PostSchema.pre<IPost>(
  'deleteOne',
  async function onDelete() {
    // Delete all child comments
    await Comment.deleteMany({ parent: this._id });
  },
);

export default mongoose.model<IPost>('Post', PostSchema);
