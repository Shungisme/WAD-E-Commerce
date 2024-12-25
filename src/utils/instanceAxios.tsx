import axios from "axios";
import { ReactNode } from "react";
import {
  clearLocalData,
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "./localStorage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { decodeJwt } from "./decodeJWT";
import { newAccessToken } from "../services/auth";
import { ROUTES_CONSTANT } from "../constants/routesConstants";

interface TProps {
  children: ReactNode;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const instanceAxios = axios.create({ baseURL: BASE_URL });

const InstanceAxiosProvider = ({ children }: TProps) => {
  const navigate = useNavigate();
  const { logoutAuth, setUser } = useAuth();

  instanceAxios.interceptors.request.use(
    async (request) => {
      const { accessToken, refreshToken } = getDataFromLocalStorage();


      if (!accessToken || !refreshToken) {
        clearLocalData();
        setUser(null);
        logoutAuth();
        navigate(ROUTES_CONSTANT.HOME_PAGE);
        return Promise.reject(new Error("No access or refresh token"));
      }

      const decodedAccess = decodeJwt(accessToken);
      const accessExpired = decodedAccess.exp && decodedAccess.exp * 1000 < Date.now();

      if (accessExpired) {
        try {
          const newToken = await newAccessToken(refreshToken);
          setDataInLocalStorage(newToken, refreshToken);
          request.headers.Authorization = `Bearer ${newToken}`;
        } catch (error) {
          clearLocalData();
          setUser(null);
          logoutAuth();
          navigate(ROUTES_CONSTANT.HOME_PAGE);
          return Promise.reject(new Error("Failed to refresh token"));
        }
      } else {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return <>{children}</>;
};

export default InstanceAxiosProvider;
