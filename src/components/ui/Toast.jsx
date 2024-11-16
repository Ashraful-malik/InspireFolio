// components/ui/Toast.js
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Optional: To validate props

const Toast = ({ message, duration = 3000, onClose, variant = "info" }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Define styles and icons based on the variant
  const variantStyles = {
    success: {
      bgColor: "bg-green-500",
      textColor: "text-green-100",
      title: "Success",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    error: {
      bgColor: "bg-red-500",
      textColor: "text-red-100",
      title: "Error",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
    },
    warning: {
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-100",
      title: "Warning",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    info: {
      bgColor: "bg-blue-500",
      textColor: "text-blue-100",
      title: "Info",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  };

  const { bgColor, textColor, icon, title } =
    variantStyles[variant] || variantStyles.info;

  useEffect(() => {
    // Auto-hide the toast after `duration` milliseconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose(); // Notify parent component of closure
    }, duration);

    return () => clearTimeout(timer); // Clean up timer on component unmount
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed justify-between bottom-5 right-5 ${bgColor} ${textColor} px-4 py-2 
      rounded-lg shadow-lg flex items-center space-x-2
      w-96 max-w-96 z-50`}
    >
      <div className="flex  items-center gap-4">
        <div className="icon  ">{icon}</div>
        <div className="content">
          <p className="font-bold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      <button
        onClick={() => {
          setIsVisible(false); // Hide the toast
          if (onClose) onClose(); // Call the onClose prop function to notify parent
        }}
        className="ml-2 font-bold"
      >
        <div className={` p-1 rounded-full`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "error", "warning", "info"]),
};

export default Toast;
