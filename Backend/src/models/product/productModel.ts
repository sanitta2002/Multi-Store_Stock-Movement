import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  sku: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<IProduct>(
  "Product",
  productSchema
);