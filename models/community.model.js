import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommunitySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    coverImage: { type: String },
    category: {
      type: String,
      enum: [
        'Hobbies',
        'Music',
        'Money',
        'Spirituality',
        'Tech',
        'Health',
        'Sports',
        'Self-improvement',
        'Relationships',
      ],
      required: true,
    },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    memberCount: { type: Number, default: 1 },
    isPrivate: { type: Boolean, default: false },
    pricing: {
      type: {
        type: String,
        enum: ['free', 'paid'],
        required: true,
      },
      amount: { type: Number },
      currency: { type: String, default: 'usd' },
      stripePriceId: { type: String },
    },
  },
  { timestamps: true },
);

export default mongoose.models.Community || mongoose.model('Community', CommunitySchema);