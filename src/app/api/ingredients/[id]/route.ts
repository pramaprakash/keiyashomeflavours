import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import MasterIngredientModel from "@/models/MasterIngredient";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const conn = await connectToDatabase();

    if (!conn) {
      return NextResponse.json({ success: false, message: "No DB connection configured" });
    }

    await MasterIngredientModel.deleteOne({ id });
    return NextResponse.json({ success: true, message: `Ingredient ${id} deleted` });
  } catch (error) {
    console.error("MongoDB DELETE Master Ingredient error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete master ingredient" }, { status: 500 });
  }
}
