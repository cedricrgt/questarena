"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, setToken, removeToken } from "@/lib/auth";
import { apiFetch as baseApiFetch } from "@/lib/api";

interface User {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login( data: { email: string; password: string } ): Promise<void>;
  signup( data: { userName: string; email: string; password: string } ): Promise<void>;
  logout(): void;
  apiFetch: typeof baseApiFetch;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 1. On mount, check for a token. If present, call /auth/me (or similar) to populate “user”.
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    // si token, fetch le current user
    baseApiFetch("/auth/me", { method: "GET" })
      .then((json) => {
        //backend envoie { name, email, ... }
        setUser({ name: json.name, email: json.email });
      })
      .catch((err) => {
        console.error("Error fetching /auth/me:", err);
        removeToken();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // 2. Wrap “apiFetch” so that if any call returns 401, we clear token & redirect
  async function apiFetch(path: string, options: RequestInit = {}) {
    try {
      return await baseApiFetch(path, options);
    } catch (error: any) {
      // Naively detect “Unauthorized” by checking status text or including a custom field.
      // If you modify baseApiFetch to throw an Error that contains status, use that.
      if (error.message.includes("401")) {
        //force logout
        removeToken();
        setUser(null);
        router.push("/auth/signin");
      }
      throw error;
    }
  }

  //lorsque login,
  // store token, setUser(, et push le navigateur to /dashboard (la homepage devrait etre /dashboard).
  async function login(data: { email: string; password: string }) {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Login failed");
    }
    const json = await res.json();
   
    setToken(json.accessToken);

    // fetch “/auth/me” pour populate “user”
    const profile = await baseApiFetch("/auth/me", { method: "GET" });
    setUser({ name: profile.name, email: profile.email });
    router.push("/account/dashboard");
  }

  async function signup(data: { userName: string; email: string; password: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Signup failed");
    }
    const json = await res.json();
    setToken(json.accessToken);
    // Fetch “/auth/me”
    const profile = await baseApiFetch("/auth/me", { method: "GET" });
    setUser({ name: profile.name, email: profile.email });
    router.push("/account/dashboard");
  }

  function logout() {
    removeToken();
    setUser(null);
    router.push("/auth/signin");
  }

  const value: AuthContextValue = {
    user,
    isLoading,
    login,
    signup,
    logout,
    apiFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}