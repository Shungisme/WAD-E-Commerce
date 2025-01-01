import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductItemProps } from "../../sections/product/product-item";
import { updateProductApi } from "../../services/products";

export const KEY_UPDATE_ACTION = "update-product";

export const updateProductAsync = createAsyncThunk(
  `${KEY_UPDATE_ACTION}/updateProduct`,
  async (product: Partial<ProductItemProps>, { rejectWithValue }) => {
    try {
      const response = await updateProductApi(product);
      return {
        product: response.product,
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
