import { ID, Permission, Query, Role } from "appwrite";
import { env } from "../env";
import { databases, account } from "../lib/appwrite";
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

    return response;
  } catch (error) {
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
    return response;
  } catch (error) {
    throw error;
  }
};

export const getApprovePost = async (cursor = null, limit = 10) => {
  try {
    const queries = [Query.equal("approved", true), Query.limit(limit)];

    // If a cursor is provided, add cursorAfter for pagination
    if (cursor) {
      queries.push(Query.cursorAfter(cursor));
    }

    const response = await databases.listDocuments(
      env.appwriteDatabaseId,
      env.appwriteCollectionId,
      queries
    );

    return response;
  } catch (error) {
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
    return response;
  } catch (error) {
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
    return response;
  } catch (error) {
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
    return response;
  } catch (error) {
    throw error;
  }
};
