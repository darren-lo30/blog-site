import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string,
  email: string,
  username: string,
  password: string,
  role: string,
  isValidPassword(this: IUser, password: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'standard'] },
});

/* --------------------------- Virtual Properties --------------------------- */
UserSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'author',
  localField: '_id',
});

UserSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'author',
});

UserSchema
  .virtual('url')
  .get(function getUrl(this: IUser) {
    return `/user/${this._id}`;
  });

UserSchema.pre<IUser>(
  'save',
  async function hashPassword(next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  },
);

UserSchema.method(
  'isValidPassword',
  async function isValidPassword(password: string) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  },
);

export default mongoose.model<IUser>('User', UserSchema);
