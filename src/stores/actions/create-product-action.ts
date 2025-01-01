import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductItemProps } from "../../sections/product/product-item";
import { addProductApi } from "../../services/products";

export const KEY_CREATE_ACTION = "create-product";

export const createProductAsync = createAsyncThunk(
  `${KEY_CREATE_ACTION}/createProduct`,
  async (product: Partial<ProductItemProps>, { rejectWithValue }) => {
    try {
      const response = await addProductApi(product);
      return {
        product: response.product,
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
