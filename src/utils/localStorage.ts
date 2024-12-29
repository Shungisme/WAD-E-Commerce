import { PRODUCT } from "../types/productType";

export const setDataInLocalStorage = (
  accessToken?: string,
  refreshToken?: string
) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("accessToken", accessToken || "");
    window.localStorage.setItem("refreshToken", refreshToken || "");
  }

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const getDataFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return {
      accessToken: window.localStorage.getItem("accessToken"),
      refreshToken: window.localStorage.getItem("refreshToken"),
    };
  }

  return {
    accessToken: null,
    refreshToken: null,
  };
};

export const clearLocalData = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
  }
};


export const getCartInLocalStorage = (): any => {
  if (typeof window === "undefined") return [];
  
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};


export const setCartItemInLocalStorage = (item: any): void => {
  if (typeof window === "undefined") return;

  const cart = getCartInLocalStorage();
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
};


export const setCartInLocalStorage = (cart: any): void => {
  if (typeof window === "undefined") return;
  
  localStorage.setItem("cart", JSON.stringify(cart));
};


export const clearCartInLocalStorage = (): void => {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem("cart");
};