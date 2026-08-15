import mongoose, { Schema, Document } from "mongoose";
import { Recipe } from "@/utils/recipeStore";

export interface IRecipeDoc extends Document, Omit<Recipe, "id"> {
  id: string;
}

const IngredientSubSchema = new Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    amount: { type: String, default: "As needed" },
    benefit: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
  },
  { _id: false, strict: false }
);

const RecipeSchema = new Schema<IRecipeDoc>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    prepTime: { type: String, required: true },
    serves: { type: Number, required: true },
    calories: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    imageUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    flavorProfile: {
      spicy: { type: Number, required: true, default: 2 },
      tangy: { type: Number, required: true, default: 2 },
      creamy: { type: Number, required: true, default: 2 },
    },
    story: { type: String, required: true },
    chef: {
      name: { type: String, required: true },
      role: { type: String, required: true },
      avatarUrl: { type: String, required: true },
    },
    ingredients: [IngredientSubSchema],
    steps: { type: Schema.Types.Mixed, required: true },
    category: {
      type: String,
      enum: ["signature", "breakfast", "lunch", "dinner", "dessert", "snack"],
      required: true,
    },
    status: { type: String, enum: ["draft", "ai_generated", "published"], default: "published" },
    createdDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Recipe || mongoose.model<IRecipeDoc>("Recipe", RecipeSchema);
