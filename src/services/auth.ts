import axios from "axios";
import { API_CONSTANTS } from "../constants/apiContants";
import { TUser } from "../types/userType";
import { getDataFromLocalStorage } from "../utils/localStorage";

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
    const url = BASE_URL + "/get-me";
    const { accessToken } = getDataFromLocalStorage();
    const response = await axios(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("error at getMeAuth in services");
    throw error;
  }
};


export const logoutAuth = async () => {
  try {
    const url = BASE_URL + 'logout';
    const response = await axios(url,{
      method:"POST",
      headers:{
        "Content-Type":"Application/json"
      }
    })

    return response.data
  } catch (error) {
    console.log("error at logout Auth");
    throw(error);
  }
}


export const getAuthGoogleUrl = () => {
  const oauth2Endpoint = `https://accounts.google.com/o/oauth2/v2/auth`;
  const params = {
      'client_id': String(process.env.REACT_APP_GOOGLE_CLIENT_ID),
      'redirect_uri':String(process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URL),
      'response_type': 'code',
      'scope': [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email'
      ].join(' '),
      'prompt':'consent',
      'access_type':'offline'
  };

  const paramsString = new URLSearchParams(params);

  return `${oauth2Endpoint}?${paramsString}`
}


