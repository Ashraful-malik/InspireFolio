"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser, useAuth } from "../../index";
import Link from "next/link";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import TopLoadingBar from "../../../components/ui/TopLoader";
function Signup() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const { loading, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message on each submit

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    try {
      const response = await signupUser(email, password, name);
      if (response) {
        // If signup is successful, show success feedback and navigate to login
        setError(null);
        router.push("/login");
      }
    } catch (error) {
      setError(error?.message);
    }
  };
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  });

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      required: true,
    },
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
      <div className="fixed top-4 left-4">
        <Button label="Back" style="dark" onClick={() => router.back()} />
      </div>
      <div className="flex items-center justify-center w-full min-h-screen px-2">
        {loading && <TopLoadingBar />}
        <div className="max-w-md w-full dark:bg-dark-surface shadow-md rounded-lg p-8 relative border dark:border-dark-border">
          <h2 className="text-3xl font-bold text-white dark:text-dark-textPrimary pb-8">
            Create account
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <InputField
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                key={field.name}
              />
            ))}
            <Button type="submit" label={"Sign Up"} />
          </form>
          <p className="text-center mt-6 text-gray-600 dark:text-dark-textSecondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:underline font-bold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
