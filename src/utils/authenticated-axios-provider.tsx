import axios from "axios";
import { useRouter } from "../hooks/use-router";
import useAuthAdmin from "../hooks/use-auth-admin";
import { getDataFromLocalStorage, setDataInLocalStorage } from "./localStorage";
import { decodeJwt } from "./decodeJWT";
import { newAccessToken } from "../services/auth";
import { ROUTES_ADMIN_CONSTANT } from "../constants/routesConstants";

type Props = {
  children: React.ReactNode;
};

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const instanceAxios = axios.create({
  baseURL: BASE_URL,
});

export default function AuthenticatedAxiosProvider({ children }: Props) {
  const router = useRouter();
  const { logoutAdmin } = useAuthAdmin();

  instanceAxios.interceptors.request.use(
    async (request: any) => {
      const { accessToken, refreshToken } = getDataFromLocalStorage();

      if (!accessToken || !refreshToken) {
        await logoutAdmin();
        router.replace(`/admin/${ROUTES_ADMIN_CONSTANT.SIGN_IN}`);
        return Promise.reject(new Error("No access or refresh token"));
      }

      const decodeRefresh = decodeJwt(refreshToken);
      const refreshExpired =
        decodeRefresh.exp && decodeRefresh.exp * 1000 < Date.now();

      if (refreshExpired) {
        await logoutAdmin();
        router.replace(`/admin/${ROUTES_ADMIN_CONSTANT.SIGN_IN}`);
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
            await logoutAdmin();
            router.replace(`/admin/${ROUTES_ADMIN_CONSTANT.SIGN_IN}`);
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
}
