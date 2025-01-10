import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { createContext, ReactNode } from "react";
import {
  getAllCategories,
  getAllProductCategories,
} from "../services/categories";
import { CategoryProps } from "../sections/product-category/category-table-row";
import { ProductItemProps } from "../sections/product/product-item";
import { addProductApi } from "../services/products";

interface Props {
  children: ReactNode;
}

interface ProductContextAdminType {
  getCategories: UseQueryResult<CategoryProps[], Error> | null;
  getMegaMenuCategories: UseQueryResult<any, Error> | null;
  addProduct: UseMutationResult<
    any,
    unknown,
    { product: Partial<ProductItemProps> },
    unknown
  > | null;
}

const initialize: ProductContextAdminType = {
  getCategories: null,
  getMegaMenuCategories: null,
  addProduct: null,
};

export const ProductContextAdmin =
  createContext<ProductContextAdminType>(initialize);

export default function ProductProviderAdmin({ children }: Props) {
  const getCategories = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const data = await getAllProductCategories();
        console.log("categories", data?.productCategories);
        return data?.productCategories;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const getMegaMenuCategories = useQuery({
    queryKey: ["mega-menu-categories"],
    queryFn: async () => {
      try {
        const data = await getAllCategories();
        console.log("mega menu categories", data?.megaMenuTitle);
        return data?.megaMenuTitle;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const addProduct = useMutation({
    mutationKey: ["add-product"],
    mutationFn: async ({ product }: { product: Partial<ProductItemProps> }) => {
      try {
        const data = await addProductApi(product);
        return data?.product;
      } catch (error) {
        console.error("Error at addProduct in services:", error);
        throw error;
      }
    },
  });

  return (
    <ProductContextAdmin.Provider
      value={{
        getCategories,
        getMegaMenuCategories,
        addProduct,
      }}
    >
      {children}
    </ProductContextAdmin.Provider>
  );
}
