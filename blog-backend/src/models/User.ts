import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string,
  email: string,
  username: string,
  password: string,
  role: string
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'standard'] },
});

/* --------------------------- Virtual population --------------------------- */
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

export default mongoose.model<IUser>('User', UserSchema);
