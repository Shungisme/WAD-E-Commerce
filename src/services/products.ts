import axios from "axios";
import { API_CONSTANTS } from "../constants/apiContants";
import { getDataFromLocalStorage } from "../utils/localStorage";
import { ProductItemProps } from "../sections/product/product-item";
import { instanceAxios } from "../utils/authenticated-axios-provider";

const BASE_URL = API_CONSTANTS.products;

export const getProductsByCategory = async ({
  categorySlug,
  page,
  limit,
  search,
  status,
}: {
  categorySlug: string;
  page: number;
  limit: number;
  search?: string;
  status?: string;
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
        status,
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

export const getProductsByFilter = async ({
  categorySlug,
  page = 1,
  limit = 6,
  search,
  sort,
  status,
}: {
  categorySlug?: string;
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  status?: string;
}) => {
  try {
    const url = BASE_URL;
    const { accessToken } = getDataFromLocalStorage();
    const response = await axios(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        categorySlug,
        page,
        limit,
        search,
        sort,
        status,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error at getProductsByFilter in servers", error);
    throw error;
  }
};

export const addProductApi = async (product: Partial<ProductItemProps>) => {
  try {
    const url = BASE_URL + "/create";
    const response = await instanceAxios.post(url, product);

    return await response.data;
  } catch (error) {
    console.log("Error at addProduct in services", error);
    throw error;
  }
};

export const updateProductApi = async (product: Partial<ProductItemProps>) => {
  try {
    const url = BASE_URL + "/update/" + product._id;
    const response = await instanceAxios.patch(url, product);

    return await response.data;
  } catch (error) {
    console.log("Error at updateProduct in services", error);
    throw error;
  }
};

export const deleteProductApi = async (productId: string) => {
  try {
    const url = BASE_URL + "/delete/" + productId;
    const response = await instanceAxios.delete(url);

    return await response.data;
  } catch (error) {
    console.log("Error at deleteProduct in services", error);
    throw error;
  }
};
