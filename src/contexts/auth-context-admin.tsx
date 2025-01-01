import { createContext, useEffect, useState, useCallback } from "react";
import { TUser } from "../types/userType";
import { getMeAuth, loginUserAPI, logoutAuth } from "../services/auth";
import { clearLocalData, setDataInLocalStorage } from "../utils/localStorage";
import { decodeJwt } from "../utils/decodeJWT";
import { useRouter } from "../hooks/use-router";
import { useScrollToTop } from "../hooks/use-scroll-to-top";

type AuthContextType = {
  admin: TUser | null;
  setAdmin: React.Dispatch<React.SetStateAction<TUser | null>>;
  loginAdmin: (data: TUser) => Promise<void>;
  logoutAdmin: () => Promise<void>;
};

type Props = {
  children: React.ReactNode;
};

const initial: AuthContextType = {
  admin: null,
  setAdmin: () => {},
  loginAdmin: async (data: TUser) => {},
  logoutAdmin: async () => {},
};

export const AuthContextAdmin = createContext<AuthContextType>(initial);

export default function AuthProviderAdmin({ children }: Props) {
  useScrollToTop();

  const [admin, setAdmin] = useState<TUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getAdmin = async () => {
      await getMeAuth()
        .then((res) => {
          const admin = res.user;

          console.log("admin", admin);

          if (admin.role && admin.role === "admin") {
            setAdmin(admin);
          } else {
            setAdmin(null);
            router.replace("/admin/sign-in");
          }
        })
        .catch((error) => {
          setAdmin(null);

          console.log(localStorage.getItem("accessToken"));
          router.replace("/admin/sign-in");
        });
    };

    getAdmin();
  }, [router]);

  const handleLogin = useCallback(async (admin: TUser) => {
    await loginUserAPI(admin)
      .then((res) => {
        const { accessToken, refreshToken } = res;
        setDataInLocalStorage(accessToken, refreshToken);

        const data: any = decodeJwt(accessToken);
        setAdmin(data.user);
      })
      .catch((error) => {
        setAdmin(null);
        throw error;
      });
  }, []);

  const handleLogout = useCallback(async () => {
    await logoutAuth()
      .then(() => {
        setAdmin(null);
        clearLocalData();
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <AuthContextAdmin.Provider
      value={{
        admin,
        setAdmin,
        loginAdmin: handleLogin,
        logoutAdmin: handleLogout,
      }}
    >
      {children}
    </AuthContextAdmin.Provider>
  );
}
