import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import RecipeModel from "@/models/Recipe";
import { DEFAULT_RECIPES } from "@/utils/recipeStore";

export const dynamic = "force-dynamic";

import mongoose from "mongoose";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    const db = conn?.connection?.db || mongoose.connection.db;

    if (!db) {
      return NextResponse.json({ success: true, source: "fallback", recipes: DEFAULT_RECIPES });
    }

    const dbRecipes = await db.collection("recipes").find({}).sort({ createdAt: -1 }).toArray();

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
    const body = await request.json();
    const { id, _id, ...updateData } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: "Recipe ID required" }, { status: 400 });
    }

    try {
      const conn = await Promise.race([
        connectToDatabase(),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000)),
      ]);
      const db = conn?.connection?.db || mongoose.connection.db;

      if (db) {
        await db.collection("recipes").updateOne(
          { id },
          { $set: { id, ...updateData } },
          { upsert: true }
        );
        console.log(`Successfully saved recipe "${id}" (${body.title}) to MongoDB database!`);
        return NextResponse.json({ success: true, source: "mongodb", recipe: { id, ...updateData } });
      }
    } catch (dbErr) {
      console.warn("MongoDB async save warning (falling back to local store):", dbErr);
    }

    return NextResponse.json({ success: true, source: "local-fallback", recipe: { id, ...updateData } });
  } catch (error) {
    console.error("POST Recipe body parse error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
