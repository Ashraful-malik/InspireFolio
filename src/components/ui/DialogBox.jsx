"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Link from "next/link";

function DialogBox({
  title = "Success",
  message = "Your portfolio has been submitted",
  timeout = 3000,
  onClose,
  button = false,
  buttonLink,
  icon = true,
}) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  // Close dialog function
  const closeDialog = () => {
    setIsVisible(false);
    if (onClose) onClose(); // Optionally run onClose prop callback
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, timeout);
    return () => clearTimeout(timer);
  }, [timeout, onClose]);

  // Return null if dialog is closed
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 ">
      <div className=" max-w-sm mx-auto overflow-hidden bg-white rounded-lg p-2 relative dark:bg-dark-surface">
        <div
          className="close-icon top-2 right-2 cursor-pointer absolute"
          onClick={closeDialog}
        >
          {/* Close icon */}
          <svg
            className="h-7 w-7 text-black p-1 bg-slate-100 rounded-full
             dark:bg-dark-overlay dark:text-dark-textPrimary  dark:border-dark-border " // Updated animation class
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        {icon && (
          <div className="icon flex item-center justify-center">
            <svg
              className="h-20 w-20 text-green-600 animate-pulse" // Updated animation class
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
        <div className="px-4 py-2 flex flex-col item-center text-center">
          <h2 className="text-2xl font-bold text-black dark:text-dark-textPrimary">
            {title}
          </h2>
          <p className="text-gray-700 font-regular dark:text-dark-textSecondary  ">
            {message}{" "}
          </p>

          {button && (
            <div className="mt-4">
              <Link href={buttonLink}>
                <Button label="Preview" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DialogBox;
