import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    reactionCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);