import { useEffect, useState } from "react";
import { IUser } from "../interfaces";
import { AuthContext } from "./AuthContext";
import { useApi } from "./useApi";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validateToken(storageData);
        if (data.user) setUser(data.user);
      }
    };
    validateToken();
  }, [api]);

  const login = async (username: string, password: string) => {
    const data = await api.login(username, password);
    if (data.user && data.hash) {
      setUser(data.user);
      setToken(data.hash);
      return true;
    }
    return false;
  };

  const signout = async () => {
    setUser(null);
    setToken("");
    await api.signout();
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider value={{ user, login, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
