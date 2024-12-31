import axios from "axios";
import { ReactNode } from "react";
import { getDataFromLocalStorage, setDataInLocalStorage } from "./localStorage";
import { useAuth } from "../hooks/useAuth";
import { decodeJwt } from "./decodeJWT";
import { newAccessToken } from "../services/auth";

interface TProps {
  children: ReactNode;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const instanceAxios = axios.create({ baseURL: BASE_URL });

const InstanceAxiosProvider = ({ children }: TProps) => {
  const { logoutAuth } = useAuth();

  instanceAxios.interceptors.request.use(
    async (request: any) => {
      const { accessToken, refreshToken } = getDataFromLocalStorage();

      if (!accessToken || !refreshToken) {
        await logoutAuth();
        return Promise.reject(new Error("No access or refresh token"));
      }

      const decondeRefresh = decodeJwt(refreshToken);
      const refreshExpired =
        decondeRefresh.exp && decondeRefresh.exp * 1000 < Date.now();
      if (refreshExpired) {
        const response = await logoutAuth();
        console.log(response);
        return Promise.reject(new Error("Refresh token has expired"));
      } else {
        const decodedAccess = decodeJwt(accessToken);
        const accessExpired =
          decodedAccess.exp && decodedAccess.exp * 1000 < Date.now();

        if (accessExpired) {
          try {
            const newToken = await newAccessToken(refreshToken);
            setDataInLocalStorage(newToken, refreshToken);
            request.headers.Authorization = `Bearer ${newToken}`;
          } catch (error) {
            await logoutAuth();
            return Promise.reject(new Error("Failed to refresh token"));
          }
        } else {
          request.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      return request;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  return <>{children}</>;
};

export default InstanceAxiosProvider;
