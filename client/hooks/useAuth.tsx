import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Role = "student" | "mentor" | "management";

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: Role;
  password: string;
}

interface AuthValue {
  user: User | null;
  login: (identifier: string, password: string) => boolean;
  signup: (user: Omit<User, "id">) => boolean;
  logout: () => void;
  resetPassword: (identifier: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthValue | undefined>(undefined);

const USERS_KEY = "nabhaedu.users";
const CURRENT_KEY = "nabhaedu.currentUser";

function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {}
}

function findUser(users: User[], identifier: string) {
  return users.find((u) => u.email === identifier || u.phone === identifier);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => loadUsers());
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(CURRENT_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => saveUsers(users), [users]);
  useEffect(() => {
    try {
      if (user) localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
      else localStorage.removeItem(CURRENT_KEY);
    } catch {}
  }, [user]);

  const login = (identifier: string, password: string) => {
    const u = findUser(users, identifier);
    if (u && u.password === password) {
      setUser(u);
      return true;
    }
    return false;
  };

  const signup = (payload: Omit<User, "id">) => {
    const exists = findUser(users, payload.email || payload.phone || "");
    if (exists) return false;
    const u: User = { ...payload, id: crypto.randomUUID() };
    setUsers((prev) => [...prev, u]);
    setUser(u);
    return true;
  };

  const resetPassword = (identifier: string, newPassword: string) => {
    const idx = users.findIndex((u) => u.email === identifier || u.phone === identifier);
    if (idx === -1) return false;
    const updated = [...users];
    updated[idx] = { ...updated[idx], password: newPassword };
    setUsers(updated);
    if (user && (user.email === identifier || user.phone === identifier)) {
      setUser(updated[idx]);
    }
    return true;
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, signup, logout, resetPassword }), [user, users]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
