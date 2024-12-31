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
    }: {
      categorySlug?: string;
      page?: number;
      limit?: number;
      search?: string;
      sort?: string;
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
      });
      return {
        data: response,
        params: {
          categorySlug,
          page,
          limit,
          search,
          sort,
        },
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
