import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field

const PostSchema = new Schema({
  title: String,
  content: String,
  actors: String,
  tags: Array,
  rating: String,
  coverUrl: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
