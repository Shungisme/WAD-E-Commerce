import { API_CONSTANTS } from "../constants/apiContants";
import { instanceAxios as axiosAdmin } from "../utils/authenticated-axios-provider";
import { instanceAxios } from "../utils/instanceAxios";

const BASE_URL = API_CONSTANTS.orders;

export const getStatisticsApi = async (year: number) => {
  try {
    const url = BASE_URL + "statistics";

    const response = await axiosAdmin(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        year,
      },
    });

    return await response.data;
  } catch (error) {
    console.log("error at getStatistics in services");
    throw error;
  }
};

export const postOrderApi = async () => {
  try {
    const url = BASE_URL + "create";

    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.data;
  } catch (error) {
    console.log("error at postOrder in services");
    throw error;
  }
};

export const getOtpApi = async () => {
  try {
    const url = BASE_URL + "get-otp";

    const response = await instanceAxios(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.data;
  } catch (error) {
    console.log("error at getOtp in services");
    throw error;
  }
};

export const postCheckoutApi = async (data: any) => {
  try {
    const url = BASE_URL + "checkout";

    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });

    return response.data;
  } catch (error) {
    console.log("error at postCheckout in services");
    throw error;
  }
};
