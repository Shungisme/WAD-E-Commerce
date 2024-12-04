import { createContext, ReactNode, useState } from "react";
import { TUser } from "../types/userType";

interface ValuesType {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  loginAuth: () => Promise<void>;
  logoutAuth: () => Promise<void>;
}

interface TProps {
  children: ReactNode;
}

const inititalData: ValuesType = {
  user: null,
  setUser: () => {},
  loginAuth: async () => {},
  logoutAuth: async () => {},
};

export const AuthContext = createContext<ValuesType>(inititalData);

const AuthProvider = ({ children }: TProps) => {
  const [user, setUser] = useState<TUser | null>(null);

  const handleLogin = async () => {};

  const handleLogout = async () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginAuth: handleLogin,
        logoutAuth: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
