import mongoose, { Document, Schema } from "mongoose";

export interface IStock extends Document {
  product: mongoose.Types.ObjectId;
  store: mongoose.Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const stockSchema = new Schema<IStock>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

stockSchema.index({ product: 1, store: 1 }, { unique: true });

export const StockModel = mongoose.model<IStock>(
  "Stock",
  stockSchema
);