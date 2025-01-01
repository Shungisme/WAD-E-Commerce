import { useContext } from "react";
import { ProductContextAdmin } from "../contexts/product-context-admin";

export default function useProductsAdmin() {
  return useContext(ProductContextAdmin);
}
