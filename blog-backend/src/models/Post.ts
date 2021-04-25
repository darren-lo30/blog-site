import mongoose, { Schema, Document } from 'mongoose';

const PostSchema: Schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  datePosted: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

export interface IPost extends Document {
  author: string,
  datePosted: Date,
  title: string, 
  body: string
}

export default mongoose.model<IPost>('Post', PostSchema);
