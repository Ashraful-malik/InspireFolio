import Link from "next/link";
import Button from "./Button";
import ProfileDialogBox from "./ProfileDialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 ">
        {/* Left Section */}
        <div className="text-white text-lg fopnt-bold w-auto h-auto">
          <Link href="/">
            <Image
              src="/inspirefolio-logo.png"
              alt="logo"
              width={120}
              height={120}
              className="w-auto h-auto"
            />
          </Link>
        </div>

        {/* Responsive Menu Button (hidden on larger screens) */}
        <button className="md:hidden text-white" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Middle Section (hidden on smaller screens, visible on larger screens) */}
        <div className="hidden md:flex space-x-6 md:justify-end  md:w-80 ">
          <Link href="/" className="text-gray-300 hover:text-white font-medium">
            Home
          </Link>
          <Link
            href="/inspiration"
            className="text-gray-300 hover:text-white font-medium"
          >
            Inspiration
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4 bg-red">
          <Button
            label="Submit portfolio"
            style="dark"
            onClick={() => router.push("/submit-portfolio")}
          />
          <div>
            <ProfileDialogBox />
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile View */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-dark-bg text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-dark-border">
          <h2 className="text-lg font-bold">Navbar</h2>

          {/* close button */}
          <button
            className="text-dark-textPrimary focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col space-y-4 mt-4 px-4">
          <Link
            href="/"
            className="text-gray-300 hover:text-white font-medium"
            onClick={toggleSidebar}
          >
            Home
          </Link>
          <Link
            href="/inspiration"
            className="text-gray-300 hover:text-white font-medium"
            onClick={toggleSidebar}
          >
            Inspiration
          </Link>
          <Button
            label="Submit portfolio"
            style="dark"
            onClick={() => router.push("/submit-portfolio")}
          />
        </div>

        {/* Sidebar Footer */}
        <div className="mt-8 px-4 py-4 border-t border-dark-border">
          <ProfileDialogBox />
        </div>
      </div>

      {/* Backdrop for Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
