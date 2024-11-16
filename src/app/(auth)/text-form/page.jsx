// pages/signup.js
"use client";
import React, { useState } from "react";
import Form from "../../../components/Form";
import { useAuth } from "../../../context/authContext";
import { useRouter } from "next/navigation";
import { checkAuth, loginUser } from "../../../services/authServices";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Use useRouter();
  const { user, setUser } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (name, value) => {
    switch (name) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
        break;
      case "password":
        if (value.length < 6) return "Password must be at least 6 characters";
        break;
      default:
        if (!value) return "This field is required";
    }
  };

  const onSubmit = async (values) => {
    console.log("Form submitted", values);
    const { email, password } = values;
    try {
      const response = await loginUser(email, password);
      const getLoggedInUser = await checkAuth();
      // send email for verification
      if (response) {
        setUser(getLoggedInUser);
        // Send email verification if not verified
        if (!getLoggedInUser.emailVerification) {
          const verifyEmail = await sendEmailVerification();
          console.log("Email sent for verification", verifyEmail);
        }
        router.push("/dashboard"); // Redirect after setting user
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error?.message || "An error occurred. Please try again later."); // Set a user-friendly error
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  return (
    <div>
      <Form
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
        fields={fields}
      />
    </div>
  );
};

export default Signup;
