import mongoose from 'mongoose';

const ReactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    targetModel: { type: String, enum: ['Post', 'Comment'], required: true },
    type: { type: String, enum: ['like', 'love', 'laugh', 'sad', 'angry'], default: 'like' },
  },
  { timestamps: true }
);

export default mongoose.models.Reaction || mongoose.model('Reaction', ReactionSchema);