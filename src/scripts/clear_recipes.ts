import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import RecipeModel from "../models/Recipe";

async function clearRecipes() {
  let uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Error: MONGODB_URI not found in .env.local.");
    process.exit(1);
  }

  if (uri.startsWith("MONGODB_URI=")) {
    uri = uri.replace("MONGODB_URI=", "");
  }

  try {
    console.log("Connecting to MongoDB Cloud database...");
    await mongoose.connect(uri);
    console.log("Connected successfully to MongoDB!");

    console.log("Deleting all recipes from MongoDB database...");
    const result = await RecipeModel.deleteMany({});
    console.log(`Successfully deleted ${result.deletedCount} recipes from MongoDB!`);
    process.exit(0);
  } catch (err) {
    console.error("Failed to delete recipes from database:", err);
    process.exit(1);
  }
}

clearRecipes();
