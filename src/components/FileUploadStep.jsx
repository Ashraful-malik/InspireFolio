import React, { useState } from "react";
import Button from "./ui/Button";
import TopLoader from "./ui/TopLoader";
export default function FileUploadStep({
  onBack,
  onFileChange,
  onSubmit,
  loader,
  uploadedFile,
  editValues,
}) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    console.log("Uploaded file:", uploadedFile);
    setFile(uploadedFile);
    onFileChange(uploadedFile); // Pass file to parent component
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Trigger final submit with all data
  };

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold mb-4 dark:text-dark-textPrimary Image">
          Upload Your Portfolio
        </h2>
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
        >
          {uploadedFile.status === 200 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check-all w-12 h-12  text-green-500"
              viewBox="0 0 16 16"
            >
              <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-cloud-arrow-up w-12 h-12 text-gray-200 "
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
              />
              <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
            </svg>
          )}
          {}
          {loader ? (
            <p className="text-green-500">Uploading...</p>
          ) : uploadedFile.status === 200 ? (
            <p className="text-green-500">File Uploaded Successfully</p>
          ) : (
            <p className="text-gray-500">Upload File</p>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          hidden
        />
      </div>
      {/* <p>{uploadedFile}</p> */}

      {(uploadedFile.url || editValues) && (
        <div className="mt-4">
          <img
            src={uploadedFile?.imageUrl || editValues.imageUrl}
            alt="Uploaded Portfolio"
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      )}
      <div className="mt-8 flex item-center justify-between">
        <Button onClick={onBack} type="button" style="outline" label="Back">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          label={uploadedFile.status === 200 ? "Submit" : "Upload"}
          type="submit"
          style="primary"
          disabled={!uploadedFile.url && !editValues}
        />
      </div>
    </div>
  );
}
