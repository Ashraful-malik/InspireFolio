import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded " }, { status: 400 });
    }

    // Check file type and size
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > maxSize) {
      return NextResponse.json({ error: "File is too large" }, { status: 400 });
    }

    // Convert the file blob into a base64 string
    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString("base64");

    // Remove file extension from file name for public_id
    const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64String}`,
      {
        folder: "portfolios-screenshot",
        public_id: fileNameWithoutExtension, // This will prevent double extensions
      }
    );

    // Return the public URL of the uploaded file
    return NextResponse.json(
      {
        url: result.secure_url,
        public_id: result.public_id,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
