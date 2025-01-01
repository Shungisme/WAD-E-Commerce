import axios from "axios";
import { API_CONSTANTS } from "../constants/apiContants";
import { getDataFromLocalStorage } from "../utils/localStorage";
import { CategoryProps } from "../sections/product-category/category-table-row";
import { instanceAxios } from "../utils/authenticated-axios-provider";

const BASE_URL = API_CONSTANTS.categories;

export const getAllCategories = async () => {
  try {
    const url = BASE_URL + "mega-menu";
    const { accessToken } = getDataFromLocalStorage();
    const reponse = await axios(url, {
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

export const getAllProductCategories = async () => {
  try {
    const url = BASE_URL;
    const response = await axios(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    return await response.data;
  } catch (error) {
    console.log("error at getAllProductCategories in services");
    throw error;
  }
};

export const getProductCategory = async (id: string) => {
  try {
    const url = BASE_URL + `${id}`;
    const response = await axios(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    return await response.data;
  } catch (error) {
    console.log("error at getProductCategory in services");
    throw error;
  }
};

export const addProductCategory = async (data: CategoryProps) => {
  try {
    const url = BASE_URL + "create";
    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      data,
    });

    return await response.data;
  } catch (error) {
    console.log("error at addProductCategory in services");
    throw error;
  }
};

export const updateProductCategory = async (data: CategoryProps) => {
  try {
    const url = BASE_URL + `update/${data._id}`;
    const response = await instanceAxios(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      data,
    });

    return await response.data;
  } catch (error) {
    console.log("error at updateProductCategory in services");
    throw error;
  }
};

export const deleteProductCategory = async (id: string) => {
  try {
    const url = BASE_URL + `delete/${id}`;
    const response = await instanceAxios(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    return await response.data;
  } catch (error) {
    console.log("error at deleteProductCategory in services");
    throw error;
  }
};
