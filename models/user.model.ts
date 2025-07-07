import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  comparePassword(candidate: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, select: false },
    image: String,
  },
  { timestamps: true },
);

UserSchema.pre<IUser>('save', async function (next: (err?: any) => void) {
  const user = this as IUser & Document;
  if (!user.isModified || !user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidate: string) {
  const user = this as IUser;
  return bcrypt.compare(candidate, user.password);
};

export default (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);