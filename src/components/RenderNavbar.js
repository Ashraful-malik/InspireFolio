"use client";
import React from "react";
import Navbar from "../components/ui/Navbar";
import { usePathname } from "next/navigation";

function RenderNavbar() {
  const pathname = usePathname();

  return pathname !== "/login" && pathname !== "/signup" && <Navbar />;
}

export default RenderNavbar;
