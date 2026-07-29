import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import RecipeModel from "@/models/Recipe";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, source: "memory", recipes: [] });
    }

    const recipes = await RecipeModel.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, source: "mongodb", recipes });
  } catch (error) {
    console.error("MongoDB GET Recipes error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch recipes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    if (!conn) {
      console.warn("MongoDB POST Recipe warning: MONGODB_URI is not connected.");
      return NextResponse.json({ success: false, message: "No DB connection configured" }, { status: 503 });
    }

    const { id } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: "Recipe ID required" }, { status: 400 });
    }

    const updatedRecipe = await RecipeModel.findOneAndUpdate(
      { id },
      { ...body },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );

    console.log(`Successfully saved recipe "${id}" to MongoDB database!`);

    return NextResponse.json({ success: true, recipe: updatedRecipe });
  } catch (error) {
    console.error("MongoDB POST Recipe error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
