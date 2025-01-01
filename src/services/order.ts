import { API_CONSTANTS } from "../constants/apiContants";
import { instanceAxios } from "../utils/authenticated-axios-provider";

const BASE_URL = API_CONSTANTS.orders;

export const getStatisticsApi = async (year: number) => {
  try {
    const url = BASE_URL + "statistics";

    const response = await instanceAxios(url, {
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
