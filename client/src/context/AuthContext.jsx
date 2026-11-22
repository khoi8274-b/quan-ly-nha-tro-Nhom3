import { createContext, useContext, useState } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("userInfo") || "null");
  });

  const login = async (email, password) => {
    const res = await axiosClient.post("/auth/login", { email, password });
    const userData = res.data.data;
    setUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
    return userData;
  };

  const register = async (formData) => {
    const res = await axiosClient.post("/auth/register", formData);
    const userData = res.data.data;
    setUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);