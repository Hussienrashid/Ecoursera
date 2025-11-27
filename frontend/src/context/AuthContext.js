import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load stored user on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("ecourse_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login
  function login(userData) {
    setUser(userData);
    localStorage.setItem("ecourse_user", JSON.stringify(userData));
  }

  // Logout
  function logout() {
    setUser(null);
    localStorage.removeItem("ecourse_user");
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
