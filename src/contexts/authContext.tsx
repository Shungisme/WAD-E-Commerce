import { createContext, ReactNode, useEffect, useState } from "react";
import { TUser } from "../types/userType";
import { getMeAuth, loginUserAPI, logoutAuth } from "../services/auth";
import {
  clearCartInLocalStorage,
  clearLocalData,
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/localStorage";
import { decodeJwt } from "../utils/decodeJWT";

interface ValuesType {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  loginAuth: (data: TUser) => Promise<void>;
  logoutAuth: () => Promise<void>;
}

interface TProps {
  children: ReactNode;
}

const inititalData: ValuesType = {
  user: null,
  setUser: () => {},
  loginAuth: async (data: TUser) => {},
  logoutAuth: async () => {},
};

export const AuthContext = createContext<ValuesType>(inititalData);

const AuthProvider = ({ children }: TProps) => {
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const getMe = async () => {
      const { accessToken, refreshToken } = getDataFromLocalStorage();
      if (!accessToken || !refreshToken) return;
      await getMeAuth()
        .then((res) => {
          const user = res.user;
          setUser(user);
        })
        .catch((error) => {
          setUser(null);
          console.log("Error at getme useEffect in auth context");
        });
    };

    getMe();
  }, []);

  const handleLogin = async (data: TUser) => {
    await loginUserAPI(data)
      .then((res) => {
        const { accessToken, refreshToken } = res;
        setDataInLocalStorage(accessToken, refreshToken);
        const data: any = decodeJwt(accessToken);
        setUser(data.user);
      })
      .catch((error) => {
        console.log("error in handle login");
        setUser(null);
        throw error;
      });
  };

  const handleLogout = async () => {
    await logoutAuth()
      .then(() => {
        setUser(null);
        clearLocalData();
        clearCartInLocalStorage();
      })
      .catch((error) => {
        console.log("error at handle logout in auth context");
        throw error;
      });
  };

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
