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

    if (!conn || !conn.connection || !conn.connection.db) {
      return NextResponse.json({ success: false, message: "No DB connection configured" });
    }

    const db = conn.connection.db;
    await db.collection("recipes").deleteOne({ id });
    return NextResponse.json({ success: true, message: `Recipe ${id} deleted` });
  } catch (error) {
    console.error("MongoDB DELETE Recipe error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete recipe" }, { status: 500 });
  }
}
