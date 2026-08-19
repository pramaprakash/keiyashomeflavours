import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/jpeg";
    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    // Try saving locally to public/uploads if filesystem is writable
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileName = `${Date.now()}-${cleanFileName}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);
    } catch (e) {
      console.warn("Read-only serverless filesystem detected, using persistent cloud Data URL:", e);
    }

    // Return cloud-persistent Data URL stored in MongoDB Cloud
    return NextResponse.json({
      success: true,
      url: dataUrl,
    });
  } catch (error) {
    console.error("Image upload API error:", error);
    return NextResponse.json({ success: false, error: "Failed to upload image" }, { status: 500 });
  }
}
