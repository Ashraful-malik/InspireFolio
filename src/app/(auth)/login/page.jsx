"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  useAuth,
  loginUser,
  checkAuth,
  sendEmailVerification,
} from "../../index";
import Link from "next/link";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import TopLoadingBar from "../../../components/ui/TopLoader";
function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(e.target);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await loginUser(email, password);

      const getLoggedInUser = await checkAuth();

      if (response) {
        setUser(getLoggedInUser);
        // Send email verification if not verified
        if (!getLoggedInUser.emailVerification) {
          const verifyEmail = await sendEmailVerification();
          console.log("Email sent for verification", verifyEmail);
        }
        router.push("/submit-portfolio"); // Redirect after setting user
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error?.message || "An error occurred. Please try again later."); // Set a user-friendly error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "example@gmail.com",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
    },
  ];
  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen ">
        {loading && <TopLoadingBar />}
        <div className="max-w-md w-full dark:bg-dark-surface shadow-md rounded-lg p-8 relative border dark:border-dark-border">
          <h2 className="text-3xl font-bold text-white dark:text-dark-textPrimary pb-8">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 ">
            {fields.map((field) => (
              <InputField
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={true}
                key={field.name}
              />
            ))}

            <Button label="Login" type="submit" style="primary" />
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <p className="text-center mt-4 text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
