"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  name: string;
  tier: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: "usr_01abc",
  email: "creator@example.com",
  name: "Alex Chen",
  tier: "pro",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("pinwatch_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = useCallback(async (_email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUser(MOCK_USER);
    localStorage.setItem("pinwatch_user", JSON.stringify(MOCK_USER));
    setIsLoading(false);
  }, []);

  const signup = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (name: string, email: string, _password: string) => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      const newUser = { ...MOCK_USER, name, email };
      setUser(newUser);
      localStorage.setItem("pinwatch_user", JSON.stringify(newUser));
      setIsLoading(false);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("pinwatch_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
