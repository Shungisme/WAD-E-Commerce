import axios from "axios";
import { API_CONSTANTS } from "../constants/apiContants";
import { getDataFromLocalStorage } from "../utils/localStorage";

const BASE_URL = API_CONSTANTS.products;

export const getProductsByCategory = async ({
  categorySlug,
  page,
  limit,
  search,
}: {
  categorySlug: string;
  page: number;
  limit: number;
  search?: string;
}) => {
  try {
    const url = BASE_URL;
    const { accessToken } = getDataFromLocalStorage();
    const response = await axios(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: accessToken,
      },
      params: {
        categorySlug,
        page,
        limit,
        search,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error at getProduct in service");
    throw error;
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const url = `${BASE_URL}/slug/${slug}`;
    const response = await axios(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error at getProductBySlug in services:", error);
    throw error;
  }
};

