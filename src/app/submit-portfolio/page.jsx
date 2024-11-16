"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FileUploadStep from "../../components/FileUploadStep";
import DetailsStep from "../../components/DetailsStep";
import { uploadImage } from "../../services/cloudinaryImageUplod";
import TopLoadingBar from "../../components/ui/TopLoader";
import { createPost, getIndividualPost } from "../../services/postService";
import DialogBox from "../../components/ui/DialogBox";
import { checkAuth } from "../../services/authServices";

function SubmitPortfolio() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [step, setStep] = useState(1); // Keeps track of the current step
  const [formValues, setFormValues] = useState({});

  const [loader, setLoader] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const [isPostSuccessful, setIsPostSuccessful] = useState(false);
  const [post, setPost] = useState(null);
  const [file, setFile] = useState({});
  const [error, setError] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  // Wrap handleNext to avoid multiple calls
  const handleNext = () => {
    console.log("Moving to next step from step:", step);
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    console.log("Moving to previous step from step:", step);
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = (values) => {
    if (
      values.description &&
      values.url &&
      values.category &&
      (values.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    ) {
      setError(null); // Clear any previous errors
      console.log("Form Values from DetailsStep:", values);
      setFormValues(values);
      handleNext(); // Move to the file upload step
    } else {
      setError(
        "Please fill in all required fields, or ensure a valid email format if provided."
      );
    }
  };

  const handleFileChange = async (uploadedFile) => {
    setImageLoader(true);
    console.log("Uploaded File:", uploadedFile);

    if (uploadedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      return;
    }
    if (!["image/jpeg", "image/png", "image/gif"].includes(uploadedFile.type)) {
      setError("Invalid file type. Please upload a JPEG, PNG, or GIF file.");
      return;
    }
    try {
      const response = await uploadImage(uploadedFile);
      setImageLoader(false);
      setError(response.data.error);
      console.log("Cloudinary Response:", response);
      setFile({
        imageUrl: response.data.url,
        status: response.status,
        public_id: response.data.public_id,
        statusText: response.statusText,
      });
    } catch (error) {
      setImageLoader(false);
      console.log("Error uploading file:", error);
      setError("error uploading file" || error.message);
      return;
    } finally {
      setImageLoader(false);
      setError(null);
    }
  };
  // for reset form data
  const resetForm = () => {
    setStep(1); // Go back to the first step
    setFormValues({});
    setFile({});
    setError(null);
  };
  const handleFinalSubmit = async () => {
    console.log("Final Submit:", formValues);
    console.log("file for ============>", formValues);

    if (!formValues && !file.imageUrl) {
      setError("Please upload a file.");
      return;
    }

    setLoader(true);
    try {
      const response = await createPost(
        formValues.email || "", // Use empty string if no email provided
        formValues.description,
        file.imageUrl || formValues.imageUrl,
        file.public_id || formValues.public_id,
        formValues.url,
        formValues.category
      );
      setPost(response);
      if (response.$id) {
        setIsPostSuccessful(true);
        resetForm();
      }
    } catch (error) {
      setLoader(false);
      setIsPostSuccessful(false);
      console.log("Error creating post:", error);
      setError("Error creating post" || error.message);
    } finally {
      setLoader(false);
    }
  };

  // Function to fetch Individual posts
  const fetchIndividualPost = async () => {
    try {
      const response = await getIndividualPost(id);
      console.log("Project fetched successfully==>", response);

      setFormValues(response);
    } catch (error) {
      console.log("error while fetching posts", error);
      setError("error while fetching posts" || error.message);
      throw error;
    }
  };

  useEffect(() => {
    const checkUserAuth = async () => {
      const user = await checkAuth();
      setAuthUser(user);

      // ----------We are allowing user to submit portfolio without email verification for now---------------

      // if (!user.emailVerification) {
      //   setTimeout(() => {
      //     router.push("/verify-email");
      //   }, 1000);
      // }
    };
    if (id) {
      fetchIndividualPost();
    }
    checkUserAuth();
  }, []);

  // -------------------------------for future use-------------------

  // if (!authUser?.emailVerification) {
  //   return (
  //     <DialogBox
  //       message="Verify your email for submission we send you a message"
  //       title="Loading..."
  //     />
  //   );
  // }
  return (
    <div className="flex items-center justify-center">
      {loader && <TopLoadingBar />}
      {isPostSuccessful && (
        <DialogBox
          button={true}
          buttonLink={`/view/${post?.$id}`}
          message="Your portfolio has been submitted successfully please wait for admin approval to view your portfolio"
        />
      )}

      <div className="max-w-md w-full dark:bg-dark-surface shadow-md rounded-lg p-8 relative">
        {imageLoader && <TopLoadingBar />}

        {step === 1 && (
          <DetailsStep
            onSubmit={handleFormSubmit} // Pass callback for form submission
            onNext={() => handleNext()} // Wrap handleNext to avoid unintended multiple calls
            editValues={formValues}
          />
        )}
        {step === 2 && (
          <FileUploadStep
            onBack={handleBack} // Callback to go back to the previous step
            onFileChange={handleFileChange} // Callback to handle file upload
            onSubmit={handleFinalSubmit}
            // Final submit callback
            loader={imageLoader}
            uploadedFile={file}
            // Pass the uploaded file
            editValues={formValues}
          />
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default SubmitPortfolio;
