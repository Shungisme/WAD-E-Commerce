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
