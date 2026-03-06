import mongoose, { Document, Schema, Model } from "mongoose";

// 1. Define the Interface (The "contract" for what a User document contains)
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  lastLogin: Date;
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create the Schema using the Interface
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

// 3. Export the Model
// We check if the model already exists to prevent errors during hot-reloading (tsx watch)
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);