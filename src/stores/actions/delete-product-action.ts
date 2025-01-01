import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteProductApi } from "../../services/products";

export const KEY_DELETE_ACTION = "delete-product";

export const deleteProductAsync = createAsyncThunk(
  `${KEY_DELETE_ACTION}/deleteProduct`,
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteProductApi(id);
      return {
        id: id,
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
