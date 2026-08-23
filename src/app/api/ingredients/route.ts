import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import MasterIngredientModel from "@/models/MasterIngredient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, source: "memory", ingredients: [] });
    }

    const ingredients = await MasterIngredientModel.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, source: "mongodb", ingredients });
  } catch (error) {
    console.error("MongoDB GET Master Ingredients error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch master ingredients" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    if (!conn) {
      return NextResponse.json({ success: false, message: "No DB connection configured" });
    }

    const { id, _id, ...updateData } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: "Ingredient ID required" }, { status: 400 });
    }

    const updated = await MasterIngredientModel.findOneAndUpdate(
      { id },
      { $set: { id, ...updateData } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, ingredient: updated });
  } catch (error) {
    console.error("MongoDB POST Master Ingredient error:", error);
    return NextResponse.json({ success: false, error: "Failed to save master ingredient" }, { status: 500 });
  }
}
