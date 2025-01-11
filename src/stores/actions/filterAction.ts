import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsByFilter } from "../../services/products";

export const KEY_FILTER_ACTION = "filter";

export const filterAsync = createAsyncThunk(
  `${KEY_FILTER_ACTION}/getData`,
  async (
    {
      categorySlug,
      page,
      limit,
      search,
      sort,
      status
    }: {
      categorySlug?: string;
      page?: number;
      limit?: number;
      search?: string;
      sort?: string;
      status?: string
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getProductsByFilter({
        categorySlug,
        page,
        limit,
        search,
        sort,
        status
      });
      return {
        data: response,
        params: {
          categorySlug,
          page,
          limit,
          search,
          sort,
          status
        },
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
