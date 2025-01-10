import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import {
  clearCartInLocalStorage,
  clearLocalData,
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "./localStorage";
import { useAuth } from "../hooks/useAuth";
import { decodeJwt } from "./decodeJWT";
import { newAccessToken } from "../services/auth";
import { ROUTES_CONSTANT } from "../constants/routesConstants";
import { useNavigate } from "react-router-dom";
import AnnouceModalComponent from "../components/AnnouceModalComponent";

interface TProps {
  children: ReactNode;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const instanceAxios = axios.create({ baseURL: BASE_URL });

const InstanceAxiosProvider = ({ children }: TProps) => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const { accessToken, refreshToken } = getDataFromLocalStorage();

      if (!accessToken || !refreshToken) {
        setUser(null);
        clearLocalData();
        clearCartInLocalStorage();
        navigate(ROUTES_CONSTANT.HOME_PAGE, { replace: true });
        return;
      }

      const decondeRefresh = decodeJwt(refreshToken);
      const refreshExpired =
        decondeRefresh.exp && decondeRefresh.exp * 1000 < Date.now();
      if (refreshExpired) {
        setOpen(true)
        setUser(null);
        clearLocalData();
        clearCartInLocalStorage();
        navigate(ROUTES_CONSTANT.HOME_PAGE, { replace: true });
        return Promise.reject(new Error("Refresh token has expired"));
      }
    }, 5000 * 60);

    return () => clearInterval(interval);
  }, []);

  instanceAxios.interceptors.request.use(
    async (request: any) => {
      const { accessToken, refreshToken } = getDataFromLocalStorage();

      if (!accessToken || !refreshToken) {
        setUser(null);
        clearLocalData();
        clearCartInLocalStorage();
        navigate(ROUTES_CONSTANT.HOME_PAGE, { replace: true });
        return Promise.reject(new Error("No access or refresh token"));
      }

      const decondeRefresh = decodeJwt(refreshToken);
      const refreshExpired =
        decondeRefresh.exp && decondeRefresh.exp * 1000 < Date.now();
      if (refreshExpired) {
        setUser(null);
        clearLocalData();
        clearCartInLocalStorage();
        navigate(ROUTES_CONSTANT.HOME_PAGE, { replace: true });
        return Promise.reject(new Error("Refresh token has expired"));
      } else {
        const decodedAccess = decodeJwt(accessToken);
        const accessExpired =
          decodedAccess.exp && decodedAccess.exp * 1000 < Date.now();

        if (accessExpired) {
          try {
            const newToken = await newAccessToken(refreshToken);
            setDataInLocalStorage(newToken, refreshToken);
            request.headers.authorization = `Bearer ${newToken}`;
          } catch (error) {
            setUser(null);
            clearLocalData();
            clearCartInLocalStorage();
            navigate(ROUTES_CONSTANT.HOME_PAGE, { replace: true });
            return Promise.reject(new Error("Failed to refresh token"));
          }
        } else {
          request.headers.authorization = `Bearer ${accessToken}`;
        }
      }

      return request;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  return (
    <>
      <AnnouceModalComponent
        open={open}
        setOpen={setOpen}
        bodyContent="Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại"
        header="Thông báo"
        doCancel={() => setOpen(false)}
        doOk={() => setOpen(false)}
      />
      {children}
    </>
  );
};

export default InstanceAxiosProvider;
