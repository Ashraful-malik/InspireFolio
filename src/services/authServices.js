import { ID } from "appwrite";
import { account, avatars } from "../lib/appwrite";
import { teams } from "../lib/appwrite";

export const signupUser = async (email, password, name) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    return response;
  } catch (error) {
    throw error;
    // return error;
  }
};
export const loginUser = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
    // The session is automatically handled by the Appwrite client
  } catch (error) {
    console.error("Login failed");
    throw error;
  }
};
export const logoutUser = async () => {
  try {
    await account.deleteSessions();
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const checkAuth = async () => {
  try {
    // Fetch the session to confirm if the user is authenticated
    const session = await account.get();
    const userTeams = await teams.list(); // Fetches teams the user belongs to
    const isAdmin = userTeams.teams.some((team) => team.name === "admin");
    return { ...session, isAdmin };
  } catch (error) {
    return null;
  }
};

export const userAvatar = async () => {
  try {
    const avatarImg = await avatars.getInitials();
    return avatarImg;
  } catch (error) {
    throw error;
  }
};
