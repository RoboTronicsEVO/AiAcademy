import mongoose from 'mongoose';

const { Schema } = mongoose;

const MembershipSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    communityId: { type: Schema.Types.ObjectId, ref: 'Community', required: true },
    role: {
      type: String,
      enum: ['member', 'admin', 'moderator', 'owner'],
      default: 'member',
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'cancelled'],
      default: 'active',
    },
    stripeSubscriptionId: { type: String },
    stripeCustomerId: { type: String },
    joinedAt: { type: Date, default: Date.now },
  },
);

MembershipSchema.index({ userId: 1, communityId: 1 }, { unique: true });

export default mongoose.models.Membership || mongoose.model('Membership', MembershipSchema);