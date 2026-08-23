import mongoose, { Schema, Document } from "mongoose";
import { MasterIngredient } from "@/utils/recipeStore";

export interface IMasterIngredientDoc extends Document, Omit<MasterIngredient, "id"> {
  id: string;
}

const MasterIngredientSchema = new Schema<IMasterIngredientDoc>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    defaultAmount: { type: String },
    benefit: { type: String },
    imageUrl: { type: String, required: true },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

MasterIngredientSchema.index({ createdAt: -1 });

export default mongoose.models.MasterIngredient ||
  mongoose.model<IMasterIngredientDoc>("MasterIngredient", MasterIngredientSchema);
