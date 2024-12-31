import { createSlice } from "@reduxjs/toolkit";
import { filterAsync, KEY_FILTER_ACTION } from "../actions/filterAction";

const intitalState = {
  categorySlug: "",
  page: 1,
  limit: 6,
  search: "",
  sort: "",
  isLoading: false,
  totalPages: 0,
  data: [],
};

export const filterReducer = createSlice({
  name: KEY_FILTER_ACTION,
  initialState: intitalState,
  reducers: {
    resetIntitalState: (state) => {
      state.categorySlug = "";
      state.limit = 6;
      state.page = 1;
      state.search = "";
      state.sort = "";
      state.isLoading = false;
      state.data = [];
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(filterAsync.fulfilled, (state, action) => {
      const {
        categorySlug = "",
        limit = 6,
        page = 1,
        sort = "",
      } = action?.payload?.params;
      state.isLoading = false;
      state.data = action?.payload?.data?.products;
      state.totalPages = action?.payload?.data?.totalPages;

      if (state.categorySlug !== categorySlug) {
        state.categorySlug = categorySlug;
      }
      if (action?.payload?.params?.limit !== state.limit) {
        state.limit = limit;
      }
      if (action?.payload?.params?.page !== state.page) {
        state.page = page;
      }

      if (state.sort !== sort) {
        state.sort = sort;
      }
    });
    builder.addCase(filterAsync.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { resetIntitalState } = filterReducer.actions;
export default filterReducer.reducer;
