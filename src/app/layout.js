"use client";
import Navbar from "../components/ui/Navbar";
import "./globals.css";
import { usePathname } from "next/navigation";
import { AuthProvider } from "../context/authContext";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter ",
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <AuthProvider>
      <html lang="en" className={`${inter.variable} dark `}>
        <body className="bg-white dark:bg-dark-bg dark:text-dark-textPrimary">
          {/* {pathname !== "/login" && pathname !== "/signup" && <Navbar />} */}
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
