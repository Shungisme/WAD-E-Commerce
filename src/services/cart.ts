import { API_CONSTANTS } from "../constants/apiContants";
import { instanceAxios } from "../utils/instanceAxios";
import { getDataFromLocalStorage } from "../utils/localStorage";

const BASE_URL = API_CONSTANTS.carts;

export const updateCart = async (userId: string, products?: any) => {
  try {
    const url = BASE_URL + "update/" + userId;
    const { accessToken } = getDataFromLocalStorage();
    
    const response = await instanceAxios(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            products,
        },
    });

    return response.data;
} catch (error) {
    console.log("error at updateCart in services");
    throw error;
}
};

export const getProductInCartById = async (userId: string) => {
    try {
    const url = BASE_URL + userId
    const  {accessToken} = getDataFromLocalStorage(); 
    const response = await instanceAxios(url,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${accessToken}`
        }
    })

    return response.data
  } catch (error) {
    console.log("error at getProductInCartById in services");
  }
};
