import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    videoUrl: { type: String },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
    reactionCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);