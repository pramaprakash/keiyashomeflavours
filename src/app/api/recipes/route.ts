import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import RecipeModel from "@/models/Recipe";
import { DEFAULT_RECIPES } from "@/utils/recipeStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: true, source: "fallback", recipes: DEFAULT_RECIPES });
    }

    const dbRecipes = await RecipeModel.find({}).sort({ createdAt: -1 }).lean();

    const map = new Map();
    DEFAULT_RECIPES.forEach((r) => map.set(r.id, r));
    if (Array.isArray(dbRecipes)) {
      dbRecipes.forEach((r: any) => {
        const recipeId = r.id || (r._id ? String(r._id) : null);
        if (recipeId) {
          map.set(recipeId, { ...r, id: recipeId });
        }
      });
    }
    const merged = Array.from(map.values());

    return NextResponse.json({ success: true, source: "mongodb", recipes: merged });
  } catch (error) {
    console.error("MongoDB GET Recipes error:", error);
    return NextResponse.json({ success: true, source: "fallback", recipes: DEFAULT_RECIPES });
  }
}

export async function POST(request: Request) {
  try {
    const conn = await connectToDatabase();

    if (!conn) {
      console.warn("MongoDB POST Recipe warning: MONGODB_URI is not connected.");
      return NextResponse.json({ success: false, message: "No DB connection configured" }, { status: 503 });
    }

    const body = await request.json();
    const { id, _id, ...updateData } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: "Recipe ID required" }, { status: 400 });
    }

    const updatedRecipe = await RecipeModel.findOneAndUpdate(
      { id },
      { $set: { id, ...updateData } },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );

    console.log(`Successfully saved recipe "${id}" to MongoDB database!`);

    return NextResponse.json({ success: true, recipe: updatedRecipe });
  } catch (error) {
    console.error("MongoDB POST Recipe error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
