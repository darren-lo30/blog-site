import mongoose, { Schema, Document } from 'mongoose';

const commentable = [
  'Post', 'Comment'
];

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  datePosted: { type: Date, required: true },
  message: { type: String, required: true },
  // If there is no parent, that means parent was deleted
  parent: { type: Schema.Types.ObjectId, refPath: 'parentModel', required: false },
  parentModel: { type: String, required: true, enum: commentable },
});

export interface IPost extends Document {
  author: Schema.Types.ObjectId,
  datePosted: Date,
  message: string,
  parent?: Schema.Types.ObjectId,
  parentModel: string
};

export default mongoose.model<IPost>('Comment', CommentSchema);
