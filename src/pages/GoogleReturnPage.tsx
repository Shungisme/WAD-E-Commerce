import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getAuthForGoogleLogin } from "../services/auth";
import SpinnerFullScreen from "../components/SpinnerFullScreen";
import {
  clearCartInLocalStorage,
  clearLocalData,
  setDataInLocalStorage,
} from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../utils/decodeJWT";

const GoogleReturnPage = () => {
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setIsLoading(true);
        const response = await getAuthForGoogleLogin();
        const { accessToken, refreshToken } = response;
        setDataInLocalStorage(accessToken, refreshToken);
        const data: any = decodeJwt(accessToken);
        setUser(data?.user);
        navigate('/')
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUser(null);
        clearLocalData();
        clearCartInLocalStorage();
        navigate("/error");
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, []);

  if (isLoading) {
    return <SpinnerFullScreen />;
  }

  return <></>;
};

export default GoogleReturnPage;
