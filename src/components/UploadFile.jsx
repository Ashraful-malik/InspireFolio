"use client";
import React, { useState } from "react";
import axios from "axios";

function Page({ fileData }) {
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await axios.post("/api/upload", formData);
      if (result.data.url) {
        setUploadStatus("Upload successful!");
        console.log("File URL:", result.data.url);
        fileData(result.data);
      } else {
        setUploadStatus("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="mb-4 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <p>{uploadStatus}</p>
    </div>
  );
}

export default Page;
