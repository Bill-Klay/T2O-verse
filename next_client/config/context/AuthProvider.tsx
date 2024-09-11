"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(() => {
    if (typeof window !== "undefined") {
      const savedAuth = localStorage.getItem("auth");
      return savedAuth ? JSON.parse(savedAuth) : {};
    }
    return {}; // Default value if localStorage is not available (SSR)
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
