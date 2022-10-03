import { createContext } from "react";
import { IUser } from "../interfaces";

export type TAuthContext = {
  user: IUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  signout: () => void;
};

export const AuthContext = createContext<TAuthContext>(null!);
