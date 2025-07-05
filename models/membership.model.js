import mongoose from 'mongoose';

const MembershipSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
    role: { type: String, enum: ['owner', 'admin', 'member'], default: 'member' },
    status: { type: String, enum: ['active', 'pending', 'banned'], default: 'active' },
    stripeSubscriptionId: { type: String },
    stripeCustomerId: { type: String },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Membership || mongoose.model('Membership', MembershipSchema);