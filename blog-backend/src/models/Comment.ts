import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  datePosted: { type: Date, required: true },
  message: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, refPath: 'parentModels', required: false },
  parentModels: { type: String, required: true, enum: ['Post', 'Comment'] },
});

export default mongoose.model('Comment', CommentSchema);
