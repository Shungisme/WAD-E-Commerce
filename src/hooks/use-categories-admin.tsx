import { useContext } from "react";
import { CategoryContextAdmin } from "../contexts/category-context-admin";

export default function useCategoriesAdmin() {
  return useContext(CategoryContextAdmin);
}
