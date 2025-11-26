import { Schema, model, models } from "mongoose";

const UserMetaSchema = new Schema({
  email: { type: String, required: true },
  phone: { type: String },
  city: { type: String },
  streetAddress: { type: String },
  admin: { type: Boolean, default: false },
}, { timestamps: true });

export const UserMeta = models?.UserMeta || model('UserMeta', UserMetaSchema);