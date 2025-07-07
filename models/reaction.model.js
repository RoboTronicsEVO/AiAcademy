import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReactionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    targetModel: {
      type: String,
      enum: ['Post', 'Comment'],
      required: true,
    },
    type: { type: String, default: 'like' },
  },
  { timestamps: true },
);

ReactionSchema.index({ userId: 1, targetId: 1, targetModel: 1 }, { unique: true });

export default mongoose.models.Reaction || mongoose.model('Reaction', ReactionSchema);