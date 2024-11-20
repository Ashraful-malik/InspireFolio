import Link from "next/link";
import React from "react";

function BackToTop() {
  return (
    <div className="">
      <div className="fixed bottom-4 right-4">
        <Link
          className="w-12 h-12 bg-black
         dark:bg-dark-overlay border dark:border-dark-border dark:text-dark-accent rounded-full
           text-center flex items-center justify-center"
          href={"#"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 hover:w-7 hover:h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default BackToTop;
