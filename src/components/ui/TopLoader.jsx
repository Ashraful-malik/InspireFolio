// components/TopLoadingBar.tsx
"use client";

import React from "react";

const TopLoadingBar = () => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-1 z-50 bg-transparent rounded-full"
      style={{
        overflow: "hidden",
      }}
    >
      <div
        className="h-full bg-green-500"
        style={{
          animation: "loadingBar 2s cubic-bezier(0.4, 0.0, 0.2, 1) infinite",
          position: "absolute",
          transform: "translateX(-100%)",
          width: "100%",
        }}
      />
      <style jsx>{`
        @keyframes loadingBar {
          0% {
            transform: translateX(-100%);
            width: 0%;
          }
          25% {
            transform: translateX(0);
            width: 25%;
          }
          50% {
            transform: translateX(25%);
            width: 70%;
          }
          100% {
            transform: translateX(100%);
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default TopLoadingBar;
