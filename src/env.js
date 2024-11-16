export const env = {
  endPoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
  projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteApiKey: process.env.APPWRITE_ADMIN_SECRET,
  appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID),
  appwriteTeamId: String(process.env.NEXT_PUBLIC_APPWRITE_TEAM_ID),
  cloudinaryCloudName: String(process.env.CLOUDINARY_CLOUD_NAME),
  cloudinaryApiKey: String(process.env.CLOUDINARY_API_KEY),
  cloudinaryApiSecret: String(process.env.CLOUDINARY_API_SECRET),
};
