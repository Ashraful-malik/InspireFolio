import axios from "axios";

export const uploadImage = async (file) => {
  if (!file) return Promise.resolve(null);
  const formData = new FormData();
  formData.append("file", file);

  try {
    const result = await axios.post("/api/upload", formData);
    if (result.data.url) {
      return result;
    } else {
      const error = new Error("Upload failed. Please try again later");
      console.error("Upload error:", error);
      return Promise.reject(error);
    }
  } catch (error) {
    console.error("Upload error:", error);
    const userFriendlyError =
      error.response?.data?.error || "Upload failed. Please try again later";
    return Promise.reject(new Error(userFriendlyError));
  }
};

export const deleteImage = async (publicId) => {
  try {
    const response = await axios.post(`/api/delete`, { publicId });
    if (response.status === 200) {
      return response;
    } else {
    }
  } catch (error) {
    throw error;
  }
};
