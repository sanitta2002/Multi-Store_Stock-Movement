import mongoose, { Document, Schema } from "mongoose";

export interface IStore extends Document {
  name: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const storeSchema = new Schema<IStore>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const StoreModel = mongoose.model<IStore>(
  "Store",
  storeSchema
);