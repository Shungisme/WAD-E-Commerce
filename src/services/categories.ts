import { API_CONSTANTS } from "../constants/apiContants";
import { instanceAxios } from "../utils/instanceAxios";
import { getDataFromLocalStorage } from "../utils/localStorage";

const BASE_URL = API_CONSTANTS.categories;

export const getAllCategories = async () => {
  try {
    const url = BASE_URL + "mega-menu";
    const { accessToken } = getDataFromLocalStorage();
    const reponse = await instanceAxios(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return reponse.data;
  } catch (error) {
    console.log("error at getAllCategories in serviecs");
    throw error;
  }
};

