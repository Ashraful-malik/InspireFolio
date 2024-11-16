"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { checkAuth } from "../app";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the current user session on initial render
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await checkAuth();
        console.log("userData==>", userData);
        setUser(userData);
      } catch {
        setUser(null); // User is not authenticated
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
