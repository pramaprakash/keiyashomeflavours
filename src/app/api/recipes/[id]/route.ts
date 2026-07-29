import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import RecipeModel from "@/models/Recipe";

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

    await RecipeModel.deleteOne({ id });
    return NextResponse.json({ success: true, message: `Recipe ${id} deleted` });
  } catch (error) {
    console.error("MongoDB DELETE Recipe error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete recipe" }, { status: 500 });
  }
}
