import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  datePosted: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

export default mongoose.model('Post', PostSchema);
