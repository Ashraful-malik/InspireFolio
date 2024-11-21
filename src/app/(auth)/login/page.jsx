"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
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
import Toast from "../../../components/ui/Toast";
function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to get query parameters
  const { user, setUser } = useAuth();
  const [showBanner, setShowBanner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await loginUser(email, password);
      const getLoggedInUser = await checkAuth();
      if (response) {
        setUser(getLoggedInUser);
        router.push("/submit-portfolio"); // Redirect after setting user
        // Send email verification if not verified

        // -------------------------------------------------------
        // if (!getLoggedInUser.emailVerification) {
        //   const verifyEmail = await sendEmailVerification();
        //   // console.log("Email sent for verification", verifyEmail);
        // }
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error?.message || "An error occurred. Please try again later."); // Set a user-friendly error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const reason = searchParams.get("reason");
    if (reason === "auth-required") {
      setShowBanner(true); // Show the banner if the reason is 'auth-required'
    }

    if (user) {
      router.push("/");
    }
  }, [user, router, searchParams]);

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
      {showBanner && (
        <Toast
          variant="warning"
          message="You need to log in to submit a portfolio."
          onClose={() => setShowBanner(false)} // Optional: Allow the banner to be dismissed
        />
      )}
      <div className="fixed top-4 left-4 p-">
        <Button label="Back" style="dark" onClick={() => router.back()} />
      </div>
      <div className="flex items-center justify-center w-full min-h-screen px-2">
        {loading && <TopLoadingBar />}

        <div className="max-w-md  w-full dark:bg-dark-surface shadow-md rounded-lg p-8 relative border dark:border-dark-border">
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
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}

// Exporting the Login component wrapped in Suspense
// export default Login;
