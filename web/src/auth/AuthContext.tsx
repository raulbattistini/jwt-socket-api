import { createContext } from "react";

export type TAuthContext = {
  user: null;
  signin: (username: string, password: string) => Promise<boolean>;
  signout: () => void;
};

export const AuthContext = createContext<TAuthContext>(null!);
