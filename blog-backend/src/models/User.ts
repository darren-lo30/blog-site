import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import Post, { IPost } from '@app/models/Post';
import Comment, { IComment } from '@app/models/Comment';

export interface IUser extends Document {
  name: string,
  email: string,
  username: string,
  password: string,
  role: string,
  link: string,
  posts: Array<IPost>,
  comments: Array<IComment>
  isValidPassword(this: IUser, password: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>({
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

UserSchema.method(
  'isValidPassword',
  async function isValidPassword(password: string) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  },
);

/* ---------------------------------- Hooks --------------------------------- */

UserSchema.pre<IUser>(
  'save',
  async function encryptPassword() {
    if (!this.isModified('password')) {
      return;
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  },
);

// Delete any related models on user deletion
UserSchema.pre<IUser>(
  ['deleteOne'],
  { document: true, query: false },
  async function onDelete() {
    await Post.deleteMany({ author: this._id });
    await Comment.deleteMany({ author: this._id });
  },
);

export default mongoose.model<IUser>('User', UserSchema);
