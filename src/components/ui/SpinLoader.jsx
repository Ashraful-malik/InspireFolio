// components/Loader.js

import React from "react";

const SpinLoader = () => {
  return (
    <div className="fixed w-full flex items-center justify-center min-h-screen z-10">
      <svg
        className="animate-spin h-12 w-12 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l2.828 2.828A8.003 8.003 0 014 12H0c0 3.183 1.18 6.091 3.177 8.177l2.823-2.886z"
        ></path>
      </svg>
    </div>
  );
};

export default SpinLoader;
