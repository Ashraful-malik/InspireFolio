import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";
export async function POST(request) {
  try {
    const { publicId } = await request.json();
    console.log("publicId From delete router==>", publicId);

    if (!publicId) {
      return NextResponse.json(
        { error: "Public ID is required" },
        { status: 400 }
      );
    }

    // Perform deletion on Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "not found") {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting file" }, { status: 500 });
  }
}
