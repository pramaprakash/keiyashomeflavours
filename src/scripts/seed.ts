import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import RecipeModel from "../models/Recipe";
import MasterIngredientModel from "../models/MasterIngredient";
import { PREDEFINED_INGREDIENTS, DEFAULT_RECIPES } from "../utils/recipeStore";




async function seed() {
  let uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Error: MONGODB_URI not found in .env.local.");
    process.exit(1);
  }

  // Clean duplicate key name if accidentally pasted twice
  if (uri.startsWith("MONGODB_URI=")) {
    uri = uri.replace("MONGODB_URI=", "");
  }

  if (uri.includes("<username>") || uri.includes("<password>")) {
    console.error("Error: MONGODB_URI in .env.local contains placeholder credentials (<username>:<password>). Please update .env.local with your real MongoDB Atlas username & password.");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB Cloud database...");
    await mongoose.connect(uri);
    console.log("Connected successfully to MongoDB!");

    console.log("Cleaning obsolete data from MongoDB...");
    const allowedIngredientIds = PREDEFINED_INGREDIENTS.map((i) => i.id);
    const deleteIngResult = await MasterIngredientModel.deleteMany({ id: { $nin: allowedIngredientIds } });
    console.log(`Deleted ${deleteIngResult.deletedCount} obsolete ingredients from MongoDB.`);

    const allowedRecipeIds = DEFAULT_RECIPES.map((r) => r.id);
    const deleteRecipeResult = await RecipeModel.deleteMany({ id: { $nin: allowedRecipeIds } });
    console.log(`Deleted ${deleteRecipeResult.deletedCount} obsolete recipes from MongoDB.`);

    console.log("Seeding Master Ingredients...");
    for (const ing of PREDEFINED_INGREDIENTS) {
      await MasterIngredientModel.findOneAndUpdate({ id: ing.id }, ing, { upsert: true, returnDocument: "after", setDefaultsOnInsert: true });
    }
    console.log(`Successfully seeded ${PREDEFINED_INGREDIENTS.length} Master Ingredients into MongoDB!`);

    console.log("Seeding Recipes...");
    for (const r of DEFAULT_RECIPES) {
      await RecipeModel.findOneAndUpdate({ id: r.id }, r, { upsert: true, returnDocument: "after", setDefaultsOnInsert: true });
    }
    console.log(`Successfully seeded ${DEFAULT_RECIPES.length} Recipes into MongoDB!`);

    console.log("ALL DATA INSERTED & CLEANED SUCCESSFULLY IN MONGODB!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
