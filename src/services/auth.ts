import axios from "axios";
import { API_CONSTANTS, ROOT_URL } from "../constants/apiContants";
import { TUser } from "../types/userType";
import {
  clearLocalData,
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/localStorage";
import { instanceAxios } from "../utils/authenticated-axios-provider";
import { decodeJwt } from "../utils/decodeJWT";

const BASE_URL = API_CONSTANTS.auth;

export const registerUserAPI = async (user: TUser) => {
  try {
    const url = BASE_URL + "register";
    const response = await axios(url, {
      method: "POST",
      data: user,
      headers: {
        "Content-Type": "Application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("error at registerUserAPI in servies");
    throw error;
  }
};

export const loginUserAPI = async (user: TUser) => {
  try {
    const url = BASE_URL + "login";
    const response = await axios(url, {
      method: "POST",
      data: user,
      headers: {
        "Content-Type": "Application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("error at loginUserAPI in services");
    throw error;
  }
};

export const getMeAuth = async () => {
  try {
    const url = BASE_URL + "current-user";
    const { accessToken, refreshToken } = getDataFromLocalStorage();

    if (!accessToken || !refreshToken) {
      clearLocalData();
      return { user: null };
    }

    const decodedRefresh = decodeJwt(refreshToken);
    const refreshExpired =
      decodedRefresh.exp && decodedRefresh.exp * 1000 < Date.now();

    if (refreshExpired) {
      clearLocalData();
      return { user: null };
    } else {
      const decodedAccess = decodeJwt(accessToken);
      const accessExpired =
        decodedAccess.exp && decodedAccess.exp * 1000 < Date.now();

      if (accessExpired) {
        try {
          const newToken = await newAccessToken(refreshToken);
          setDataInLocalStorage(newToken, refreshToken);

          const response = await axios(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          return response.data;
        } catch (error) {
          clearLocalData();
          return { user: null };
        }
      } else {
        const response = await axios(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return response.data;
      }
    }
  } catch (error: any) {
    console.log("error at getMeAuth in services");
    throw error;
  }
};

export const logoutAuth = async () => {
  try {
    const url = BASE_URL + "logout";
    const response = await axios(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("error at logout Auth");
    throw error;
  }
};

export const newAccessToken = async (refreshToken: string) => {
  try {
    const url = BASE_URL + "refresh";
    const { accessToken } = getDataFromLocalStorage();

    const newToken = await axios(url, {
      method: "POST",
      data: {
        refreshToken: refreshToken,
      },
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return newToken.data.newAccessToken;
  } catch (error) {
    console.log("error at refresh Token in services");
    throw error;
  }
};

export const getAuthGoogleUrl = () => {
  const oauth2Endpoint = `https://accounts.google.com/o/oauth2/v2/auth`;
  const params = {
    client_id: String(process.env.REACT_APP_GOOGLE_CLIENT_ID),
    redirect_uri: String(process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URL),
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    prompt: "consent",
    access_type: "offline",
  };

  const paramsString = new URLSearchParams(params);

  return `${oauth2Endpoint}?${paramsString}`;
};

export const getAuthForGoogleLogin = async () => {
  try {
    const url = ROOT_URL + "/auth/current-user";
    const response = await axios(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error at getAuthForGoogleLogin at service");
    throw error;
  }
};

export const addUserApi = async (user: TUser) => {
  try {
    const url = BASE_URL + "register";
    const response = await instanceAxios(url, {
      method: "POST",
      data: user,
      headers: {
        "Content-Type": "application/json",
      },
    });

    await updateUserApi({ ...user, _id: response.data._id });

    return { message: "Account created successfully" };
  } catch (error) {
    console.log("error at addUserApi in services");
    throw error;
  }
};

export const updateUserApi = async (user: TUser) => {
  try {
    const url = BASE_URL + "update/" + user._id;

    const response = await instanceAxios(url, {
      method: "PATCH",
      data: user,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.data;
  } catch (error) {
    console.log("error at updateUserApi in services");
    throw error;
  }
};

export const getUsersApi = async () => {
  try {
    const url = BASE_URL + "users";

    const response = await instanceAxios(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.data;
  } catch (error) {
    console.log("error at getUsersApi in services");
    throw error;
  }
};

export const deleteUserApi = async (userId: string) => {
  try {
    const url = BASE_URL + "delete/" + userId;

    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.data;
  } catch (error) {
    console.log("error at deleteUserApi in services");
    throw error;
  }
};

export const receciveCode = async (email: string, type: string) => {
  try {
    const url = BASE_URL + "verification-codes";
    const response = await axios(url, {
      method: "POST",
      data: {
        email,
        type,
      },
    });

    return response?.data;
  } catch (error) {
    console.log("error at receciveCodeChangePassword");
    throw error;
  }
};

export const changePassword = async ({
  oldPassword,
  newPassword,
  code,
}: {
  oldPassword: string;
  newPassword: string;
  code: string;
}) => {
  try {
    const url = BASE_URL + "change-password";
    const {accessToken} = getDataFromLocalStorage()
    const response = await instanceAxios(url, {
      method: "POST",
      data: {
        oldPassword,
        newPassword,
        code,
      },
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    });
    return response?.data;
  } catch (error) {
    console.log("error at changePassword in service");
  }
};


export const verifyCodeAccount = async (email: string, code: string) => {
  try {
    const url = BASE_URL+ "verification-codes/verify"
    const response = await axios(url,{
      method:"POST",
      data:{
        email,
        code
      }
    })

    return response?.data
  } catch (error) {
    console.log("Error at verifyCodeAccount");
    throw error;
  }
}
