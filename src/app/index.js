import { account } from "../lib/appwrite";
import {
  loginUser,
  logoutUser,
  checkAuth,
  signupUser,
} from "../services/authServices";
import { useAuth } from "../context/authContext";
import { sendEmailVerification } from "../services/verifyUser";

export {
  account,
  loginUser,
  logoutUser,
  checkAuth,
  useAuth,
  signupUser,
  sendEmailVerification,
};
