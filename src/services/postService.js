import { ID, Permission, Query, Role } from "appwrite";
import { env } from "../env";
import { databases, account } from "../lib/appwrite";
import { deleteImage } from "./cloudinaryImageUplod";
export const createPost = async (
  email,
  description,
  imageUrl,
  publicId,
  websiteUrl,
  category
) => {
  try {
    const user = await account.get();

    const response = await databases.createDocument(
      env.appwriteDatabaseId,
      env.appwriteCollectionId,
      ID.unique(),
      {
        email,
        description,
        publicId,
        imageUrl,
        websiteUrl,
        userId: user.$id,
        approved: false, // default to false
        createdAt: new Date(),
        category,
      },
      [
        Permission.read(Role.any()),
        Permission.read(Role.users()), // Allow any authenticated user to read
        Permission.update(Role.user(user.$id)), // Allow creator to update
        Permission.delete(Role.user(user.$id)), // Allow creator to delete
      ]
    );

    console.log("Project submitted successfully==>", response);

    return response;
  } catch (error) {
    console.log("Error while creating project", error);
    throw error;
  }
};

export const getUnapprovedPosts = async () => {
  try {
    const response = await databases.listDocuments(
      env.appwriteDatabaseId,
      env.appwriteCollectionId,
      [Query.equal("approved", false), Query.orderDesc("createdAt")] // { filters: ["approved: true"] }
    );
    console.log("Posts fetched successfully==>", response);
    return response;
  } catch (error) {
    console.log("error while fetching posts", error);
    throw error;
  }
};

export const getApprovePost = async () => {
  try {
    const response = await databases.listDocuments(
      env.appwriteDatabaseId,
      env.appwriteCollectionId,
      [Query.equal("approved", true)] // { filters: ["approved: true"] }
    );
    console.log("Posts fetched successfully==>", response);
    return response;
  } catch (error) {
    console.log("error while fetching posts", error);
    throw error;
  }
};
export const approvePost = async (id) => {
  try {
    const response = await databases.updateDocument(
      env.appwriteDatabaseId,
      env.appwriteCollectionId,
      id,
      { approved: true }
    );
    console.log("Project approved successfully==>", response);
    return response;
  } catch (error) {
    console.log("Error while approving project", error);
    throw error;
  }
};
export const getIndividualPost = async (id) => {
  try {
    const response = await databases.getDocument(
      env.appwriteDatabaseId,
      env.appwriteCollectionId,
      id
    );
    console.log("Project fetched successfully==>", response);
    return response;
  } catch (error) {
    console.log("Error while fetching project", error);
    throw error;
  }
};
export const deletePost = async (id) => {
  try {
    const response = await databases.deleteDocument(
      env.appwriteDatabaseId,
      env.appwriteCollectionId,
      id
    );
    // const result = await deleteImage(response.publicId);
    console.log("Project deleted successfully==>", response);
    return response;
  } catch (error) {
    console.log("Error while deleting project", error);
    throw error;
  }
};
