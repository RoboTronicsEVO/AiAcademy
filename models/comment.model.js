import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
    reactionCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);