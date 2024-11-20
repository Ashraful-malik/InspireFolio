import { account } from "../lib/appwrite";

export const sendEmailVerification = async () => {
  try {
    // Construct verification URL
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify`;
    const response = await account.createVerification(redirectUrl);
    return response;
  } catch (error) {
    throw error;
  }
};
